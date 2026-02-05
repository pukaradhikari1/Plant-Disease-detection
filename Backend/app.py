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

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("Supabase environment variables are missing")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

with open("class_names.json", "r") as f:
    CLASS_NAMES = json.load(f)

print("Class names loaded")

MODELS = {
    "cnn": tf.keras.models.load_model("models/standardCNN.keras"),
    "resnet": tf.keras.models.load_model("saved_model/plant_disease_resnet.keras"),
    "densenet": tf.keras.models.load_model("models/densenet.h5"),
    "efficientnet": tf.keras.models.load_model("models/efficientnet.keras"),
}

print("All models loaded successfully")

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

    return img

@app.route("/predict", methods=["POST"])
def predict():
    start_time = time.time()

    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        model_key = request.form.get("model", "resnet")

        if model_key not in MODELS:
            return jsonify({"error": "Invalid model selected"}), 400

        file = request.files["image"]
        model = MODELS[model_key]

        filename = f"{uuid.uuid4()}.jpg"
        local_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(local_path)

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

        storage_path = f"public/{filename}"

        with open(local_path, "rb") as f:
            supabase.storage.from_("leaf-images").upload(
                storage_path,
                f,
                file_options={"content-type": "image/jpeg"}
            )

        image_url = (
            f"{SUPABASE_URL}/storage/v1/object/public/"
            f"leaf-images/public/{filename}"
        )

        supabase.table("plant_disease_logs").insert({
            "image_url": image_url,
            "model_used": model_key,
            "disease_name": best_prediction["disease"],
            "confidence": best_prediction["confidence"]
        }).execute()

        os.remove(local_path)

        return jsonify({
            "model": model_key,
            "best_prediction": best_prediction,
            "top_predictions": top_predictions,
            "image_url": image_url,
            "processingTime": f"{round(time.time() - start_time, 2)}s"
        })

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
