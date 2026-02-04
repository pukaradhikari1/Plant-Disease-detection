import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.resnet50 import preprocess_input


# PATHS

MODEL_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"
IMAGE_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\test_leaf.jpg"


# CLASS NAMES (MUST MATCH TRAINING ORDER)

class_names = [
    "Cauliflower_Bacterial_Spot_Rot",
    "Cauliflower_Downy_Mildew",
    "Cauliflower_Healthy",
    "Cauliflower_Black_Rot",
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


# LOAD MODEL

model = tf.keras.models.load_model(MODEL_PATH)
print(" Model loaded successfully.")


img = Image.open(IMAGE_PATH).convert("RGB")
img = img.resize((224, 224))

img_array = np.array(img)
img_array = np.expand_dims(img_array, axis=0)



img_array = preprocess_input(img_array)


# PREDICTION

predictions = model.predict(img_array)

predicted_index = np.argmax(predictions[0])
predicted_disease = class_names[predicted_index]
confidence = np.max(predictions[0]) * 100 

# OUTPUT
print("\n🔍 Prediction Result")
print("----------------------")
print(f" Disease Name : {predicted_disease}")
print(f" Confidence   : {confidence:.2f}%")


