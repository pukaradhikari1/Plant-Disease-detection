import tensorflow as tf
import numpy as np

model0 = tf.keras.models.load_model('standardCNN.keras')
model1 = tf.keras.models.load_model('resnet.keras')
model2 = tf.keras.models.load_model('densenet.h5')
model3 = tf.keras.models.load_model('efficientnet.keras')

img = tf.keras.preprocessing.image.load_img('tests/0bsr.JPG', target_size=(224, 224))
img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

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

def predict(model, model_name):
    probs = model.predict(img_array)
    predicted_index = np.argmax(probs)
    confidence = probs[0][predicted_index]
    print(f"{model_name} Prediction: {class_names[predicted_index]} ({confidence*100:.2f}%)")

predict(model0, "Model 0")
predict(model1, "Model 1")
predict(model2, "Model 2")
predict(model3, "Model 3")
