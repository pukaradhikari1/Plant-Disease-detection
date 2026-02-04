from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from utils import preprocess_image
import time

app = Flask(__name__)
CORS(app)

MODELS = {
    "cnn": tf.keras.models.load_model("models/standardCNN.keras"),
    "resnet": tf.keras.models.load_model("models/resnet.keras"),
    "densenet": tf.keras.models.load_model("models/densenet.h5"),
    "efficientnet": tf.keras.models.load_model("models/efficientnet.keras"),
}

CLASS_NAMES = [
    'Cauliflower_Bacterial_Spot_Rot',
    'Cauliflower_Downy_Mildew',
    'Cauliflower_Healthy',
    'Cauliflowere_Black_Rot',
    'Potato_Healthy',
    'Potato_Late_Blight',
    'Tomato_Bacterial_Spot',
    'Tomato_Early_Blight',
    'Tomato_Healthy',
    'Tomato_Late_Blight',
    'Tomato_Leaf_Mold',
    'Tomato_Septoria_Leaf_Spot',
    'Tomato_Spider_Mites_Two_Spotted_Spider_Mite',
    'Tomato_Target_Spot',
    'Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato_mosaic_virus'
]

@app.route("/predict", methods=["POST"])

def predict():
    start = time.time()

    image = request.files.get("image")
    model_key = request.form.get("model")


    if image is None or model_key not in MODELS:
        return jsonify({"error": "Invalid request"}), 400

    img = preprocess_image(image)
    model = MODELS[model_key]

    preds = model.predict(img)[0]
    idx = int(preds.argmax())

    return jsonify({
        "name": CLASS_NAMES[idx],
        "pathogen": "Detected via Deep Learning",
        "confidence": round(float(preds[idx]) * 100, 2),
        "description": "Automatically detected plant leaf disease.",
        "treatments": [],
        "image": "",
        "processingTime": f"{round(time.time() - start, 2)}s"
    })


if __name__ == "__main__":
    app.run(debug=True)
