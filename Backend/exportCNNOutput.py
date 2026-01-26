import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import json

models = {
    "StandardCNN": tf.keras.models.load_model("standard.keras"),
    "ResNet50V2": tf.keras.models.load_model("ResNet50V2_Model.keras"),
    # "EfficientNet": tf.keras.models.load_model("EfficientNet.keras"),
    "DenseNet": tf.keras.models.load_model("densenet121_plant_disease.h5"),
}

class_names = [
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

IMG_SIZE = (256, 256)

def predict(model, img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE)
    arr = image.img_to_array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)
    probs = model.predict(arr)[0]
    idx = int(np.argmax(probs))
    return {
        "predictedClass": class_names[idx],
        "confidence": float(probs[idx]),
        "probabilities": {
            class_names[i]: float(probs[i]) for i in range(len(class_names))
        }
    }

image_paths = [
    r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage\Potato_Healthy\0.JPG",
    r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage\Tomato_Late_Blight\0.JPG",
    r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage\Cauliflower_Downy_Mildew\Downy Mildew. (17).JPG"
]

model_metrics = {
    "StandardCNN": {"accuracy": 0.87, "precision": 0.86, "recall": 0.85, "f1Score": 0.855},
    "ResNet50V2": {"accuracy": 0.92, "precision": 0.91, "recall": 0.90, "f1Score": 0.905},
    "EfficientNet": {"accuracy": 0.94, "precision": 0.93, "recall": 0.92, "f1Score": 0.925},
    "DenseNet": {"accuracy": 0.93, "precision": 0.92, "recall": 0.91, "f1Score": 0.915},
}

output = {}

for model_name, model in models.items():
    output[model_name] = {
        "metrics": model_metrics[model_name],
        "predictions": []
    }
    for path in image_paths:
        output[model_name]["predictions"].append(
            predict(model, path)
        )

with open("model_results.json", "w") as f:
    json.dump(output, f, indent=4)

print("model_results.json generated")
