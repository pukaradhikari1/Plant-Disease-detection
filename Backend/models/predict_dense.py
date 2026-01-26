import tensorflow as tf
import numpy as np
from PIL import Image

# ======================
# CONFIGURATION
# ======================
MODEL_PATH = "../models/densenet121_plant_disease.h5"
IMAGE_PATH = "../test_images/test_leaf.jpg"
IMG_SIZE = (224, 224)

# ======================
# CLASS NAMES (MUST MATCH TRAINING ORDER)
# ======================
class_names = [
    'Cauliflower_Bacterial_Spot_Rot',
    'Cauliflower_Downy_Mildew',
    'Cauliflowere_Black_Rot',
    'Cauliflower_Healthy',
    'Potato_Healthy',
    'Potato_Late_Blight',
    'Tomato_Bacterial_Spot',
    'Tomato_Healthy',
    'Tomato_Early_Blight',
    'Tomato_Late_Blight',
    'Tomato_Leaf_Mold',
    'Tomato_mosaic_virus',
    'Tomato_Septoria_Leaf_Spot',
    'Tomato_Spider_Mites_Two_Spotted_Spider_Mite',
    'Tomato_Target_Spot',
    'Tomato_Yellow_Leaf_Curl_Virus'
]

# ======================
# LOAD MODEL
# ======================
model = tf.keras.models.load_model(MODEL_PATH)

# ======================
# LOAD & PREPROCESS IMAGE
# ======================
img = Image.open(IMAGE_PATH).convert("RGB")
img = img.resize(IMG_SIZE)

img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# ======================
# PREDICTION
# ======================
predictions = model.predict(img_array)
predicted_index = np.argmax(predictions)
confidence = np.max(predictions)

predicted_class = class_names[predicted_index]

# ======================
# OUTPUT
# ======================
print("\n🩺 Prediction Result")
print("---------------------")
print(f"Image: {IMAGE_PATH}")
print(f"Disease: {predicted_class}")
print(f"Confidence: {confidence * 100:.2f}%")
