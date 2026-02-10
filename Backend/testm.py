import tensorflow as tf
import numpy as np
import json

model = tf.keras.models.load_model(
    r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"
)

with open("class_names.json", "r") as f:
    class_names = json.load(f)

img_path = "test/0bsr.JPG"

img = tf.keras.preprocessing.image.load_img(
    img_path,
    target_size=(224, 224)
)

img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)

predictions = model.predict(img_array)

predicted_index = np.argmax(predictions[0])
confidence = predictions[0][predicted_index]

print("Predicted class:", class_names[predicted_index])
print(f"Confidence: {confidence * 100:.2f}%")
