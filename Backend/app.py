import os
import uuid
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf
from dotenv import load_dotenv
from supabase import create_client

# =======================
# LOAD ENV VARIABLES
# =======================
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("❌ Supabase environment variables are missing")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# =======================
# FLASK APP
# =======================
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =======================
# LOAD MODEL
# =======================
MODEL_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"

CLASS_NAMES = [
    "Cauliflower_Bacterial_Spot_Rot",
    "Cauliflower_Black_Rot",
    "Cauliflower_Downy_Mildew",
    "Cauliflower_Healthy",
    "Potato_Healthy",
    "Potato_Late_Blight",
    "Tomato_Bacterial_Spot",
    "Tomato_Early_Blight",
    "Tomato_Healthy",
    "Tomato_Late_Blight",
    "Tomato_Leaf_Mold",
    "Tomato_Mosaic_Virus",
    "Tomato_Septoria_Leaf_Spot",
    "Tomato_Spider_Mites_Two_Spotted_Spider_Mite",
    "Tomato_Target_Spot",
    "Tomato_Yellow_Leaf_Curl_Virus"
]

model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Model loaded successfully")

# =======================
# ROUTES
# =======================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # -----------------------
        # VALIDATE INPUT
        # -----------------------
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        # -----------------------
        # SAVE LOCALLY
        # -----------------------
        filename = f"{uuid.uuid4()}.jpg"
        local_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(local_path)

        # -----------------------
        # PREPROCESS IMAGE
        # -----------------------
        img = Image.open(local_path).convert("RGB")
        img = img.resize((224, 224))
        img_array = np.expand_dims(np.array(img), axis=0) / 255.0

        # -----------------------
        # MODEL PREDICTION
        # -----------------------
        predictions = model.predict(img_array)[0]
        top_indices = np.argsort(predictions)[-3:][::-1]

        top_predictions = [
            {
                "disease": CLASS_NAMES[i],
                "confidence": float(predictions[i])
            }
            for i in top_indices
        ]

        best_prediction = top_predictions[0]

        # -----------------------
        # UPLOAD TO SUPABASE STORAGE
        # -----------------------
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

        # -----------------------
        # STORE LOG IN DATABASE
        # -----------------------
        supabase.table("plant_disease_logs").insert({
            "image_url": image_url,
            "disease_name": best_prediction["disease"],
            "confidence": best_prediction["confidence"]
        }).execute()

        # -----------------------
        # CLEANUP
        # -----------------------
        os.remove(local_path)

        # -----------------------
        # RESPONSE
        # -----------------------
        return jsonify({
            "best_prediction": best_prediction,
            "top_predictions": top_predictions,
            "image_url": image_url
        })

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


# =======================
# RUN SERVER
# =======================
if __name__ == "__main__":
    app.run(debug=True)
