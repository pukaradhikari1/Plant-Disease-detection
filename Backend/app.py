from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

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
    "Tomato_mosaic_virus",
    "Tomato_Septoria_Leaf_Spot",
    "Tomato_Spider_Mites_Two_Spotted_Spider_Mite",
    "Tomato_Target_Spot",
    "Tomato_Yellow_Leaf_Curl_Virus"
]

model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Model loaded successfully")

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    img = Image.open(file).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.expand_dims(np.array(img), axis=0)
    img_array = img_array / 255.0  # ✅ SAME AS TRAINING

    predictions = model.predict(img_array)[0]

    top_indices = np.argsort(predictions)[-3:][::-1]

    top_predictions = [
        {
            "disease": CLASS_NAMES[i],
            "confidence": float(predictions[i])
        }
        for i in top_indices
    ]

    return jsonify({
        "best_prediction": top_predictions[0],
        "top_predictions": top_predictions
    })

if __name__ == "__main__":
    app.run(debug=True)
