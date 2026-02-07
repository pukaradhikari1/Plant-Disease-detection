import os
import uuid
import time
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf
from dotenv import load_dotenv
from supabase import create_client
from tensorflow.keras.applications import densenet, efficientnet

# ---------------- LOAD ENV ----------------
load_dotenv()

# CRITICAL: Ensure this uses the SERVICE_ROLE key from Supabase (not the Anon key)
# The Service Role key bypasses Row Level Security (RLS)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") 

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Supabase environment variables are missing. Check .env file.")

# Ensure URL format is correct
SUPABASE_URL = SUPABASE_URL.rstrip("/") + "/"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ---------------- APP SETUP ----------------
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- LOAD CLASS NAMES ----------------
try:
    with open("class_names.json", "r") as f:
        CLASS_NAMES = json.load(f)
    print("Class names loaded successfully")
except FileNotFoundError:
    print("ERROR: class_names.json not found!")
    CLASS_NAMES = []


# Wrap in try-except to prevent crash if models are missing during dev
MODELS = {}
try:
    MODELS = {
        "cnn": tf.keras.models.load_model("saved_model/standardCNN.keras"),
        "resnet": tf.keras.models.load_model("saved_model/resnet_transfer_learning.keras"),
        "densenet": tf.keras.models.load_model("saved_model/densenet.h5"),
        "efficientnet": tf.keras.models.load_model("saved_model/plant_disease_efficientnet.keras"),
    }
    print("All models loaded successfully")
except Exception as e:
    print(f"Warning: Could not load some models. {e}")

# ---------------- IMAGE PREPROCESS ----------------
def preprocess_image(image_path, model_key):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)

    if model_key == "cnn":
        img = img / 255.0
    elif model_key == "densenet":
        img = densenet.preprocess_input(img)
    elif model_key == "efficientnet":
        img = efficientnet.preprocess_input(img)
    
    # Resnet usually expects standard 0-255 or specific preprocess, 
    # assuming standard rescale if not specified otherwise for your custom model
    return img

# ---------------- PREDICT ROUTE ----------------
@app.route("/predict", methods=["POST"])
def predict():
    start_time = time.time()
    local_path = None

    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        model_key = request.form.get("model", "resnet")
        
        # Fallback if model keys are slightly different or missing
        if model_key not in MODELS:
            if "resnet" in MODELS:
                model_key = "resnet"
            else:
                return jsonify({"error": "Model not available on server"}), 500

        file = request.files["image"]
        model = MODELS[model_key]

        # Save temporarily
        filename = f"{uuid.uuid4()}.jpg"
        local_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(local_path)

        # 1. Prediction
        img = preprocess_image(local_path, model_key)
        preds = model.predict(img)[0]

        top_indices = np.argsort(preds)[-3:][::-1]
        top_predictions = [
            {
                "disease": CLASS_NAMES[i],
                "confidence": round(float(preds[i]) * 100, 2)
            }
            for i in top_indices
        ]
        best_prediction = top_predictions[0]

        # 2. Supabase Upload (Wrapped to prevent crashing prediction if DB fails)
        image_url = None
        try:
            with open(local_path, "rb") as f:
                # 'upsert': 'true' helps if file exists
                supabase.storage.from_("leaf-images").upload(
                    filename,
                    f,
                    file_options={"content-type": "image/jpeg", "upsert": "true"}
                )
            image_url = supabase.storage.from_("leaf-images").get_public_url(filename)
        except Exception as e:
            print(f" Storage Error (Proceeding anyway): {e}")
            # Do not return 500 here; just continue without URL

        # 3. Database Insert
        try:
            if image_url: # Only log if we have an image URL, or allow NULL
                supabase.table("plant_disease_logs").insert({
                    "image_url": image_url,
                    "disease_name": best_prediction["disease"],
                    "confidence": best_prediction["confidence"],
                    # "model_used": model_key # Uncomment if you added this column back
                }).execute()
        except Exception as e:
            print(f" Database Error (Proceeding anyway): {e}")

        # Cleanup
        if os.path.exists(local_path):
            os.remove(local_path)

        # ---------------- RESPONSE ----------------
        return jsonify({
            "name": best_prediction["disease"],
            "confidence": best_prediction["confidence"],
            "image": image_url,
            "top_predictions": top_predictions,
            "processingTime": f"{round(time.time() - start_time, 2)}s",
            # Mock treatments for frontend display 
            "treatments": [
                {
                    "type": "Chemical",
                    "color": "danger",
                    "icon": "sanitizer",
                    "title": "Fungicide Application",
                    "steps": ["Apply Copper Oxychloride", "Spray every 7 days"]
                },
                {
                    "type": "Biological",
                    "color": "primary",
                    "icon": "eco",
                    "title": "Bio-Control",
                    "steps": ["Use Trichoderma viride", "Soil application"]
                }
            ]
        })

    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        if local_path and os.path.exists(local_path):
            os.remove(local_path)
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)