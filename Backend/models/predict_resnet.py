import tensorflow as tf
import numpy as np
from PIL import Image
import json

MODEL_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"
IMAGE_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\test_leaf.jpg"

# load class names 
with open("class_names.json", "r") as f:
    class_names = json.load(f)

# load the model
model = tf.keras.models.load_model(MODEL_PATH)
print(" Model loaded successfully.")

# load and prep the image
img = Image.open(IMAGE_PATH).convert("RGB")
img = img.resize((224, 224))

# convert to array
img_array = np.expand_dims(np.array(img), axis=0)

# make prediction
predictions = model.predict(img_array)

predicted_index = np.argmax(predictions[0])
predicted_disease = class_names[predicted_index]
confidence = predictions[0][predicted_index] * 100

print("\n Prediction Result")
print("----------------------")
print(f" Disease Name : {predicted_disease}")
print(f" Confidence   : {confidence:.2f}%")
