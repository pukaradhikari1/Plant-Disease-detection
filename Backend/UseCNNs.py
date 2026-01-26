import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os


#loading the models
MODEL_PATH0 = "standard.keras"
MODEL_PATH1 = "ResNet50V2_Model.keras"
MODEL_PATH2 = "EfficientNet.keras"
MODEL_PATH3 = "densenet121_plant_disease.h5"

model0 = tf.keras.models.load_model(MODEL_PATH0)
model1 = tf.keras.models.load_model(MODEL_PATH1)
# model2 = tf.keras.models.load_model(MODEL_PATH2)
model3 = tf.keras.models.load_model(MODEL_PATH3)


#class names same as in training
class_names = ['Cauliflower_Bacterial_Spot_Rot', 'Cauliflower_Downy_Mildew', 'Cauliflower_Healthy', 'Cauliflowere_Black_Rot', 'Potato_Healthy', 'Potato_Late_Blight', 'Tomato_Bacterial_Spot', 'Tomato_Early_Blight', 'Tomato_Healthy', 'Tomato_Late_Blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_Leaf_Spot', 'Tomato_Spider_Mites_Two_Spotted_Spider_Mite', 'Tomato_Target_Spot', 'Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_mosaic_virus']

IMG_SIZE_STANDARD = (256, 256)
IMG_SIZE_RESNET = (224, 224)
IMG_SIZE_EFFICIENTNET = (224, 224)
IMG_SIZE_DENSENET = (224, 224)


def predict_image0(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE_STANDARD)
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0      
    img_array = np.expand_dims(img_array, axis=0)


    predictions = model0.predict(img_array)
    predicted_index = np.argmax(predictions)
    confidence = np.max(predictions)

    return class_names[predicted_index], confidence

def predict_image1(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE_RESNET)
    img_array = image.img_to_array(img)
    img_array = img_array / 223.0      
    img_array = np.expand_dims(img_array, axis=0)


    predictions = model1.predict(img_array)
    predicted_index = np.argmax(predictions)
    confidence = np.max(predictions)

    return class_names[predicted_index], confidence

def predict_image2(img_path):
    img = image.load_img(img_path, target_size=(IMG_HEIGHT, IMG_WIDTH))
    img_array = image.img_to_array(img)
    img_array = img_array / 223.0      
    img_array = np.expand_dims(img_array, axis=0)


    predictions = model2.predict(img_array)
    predicted_index = np.argmax(predictions)
    confidence = np.max(predictions)

    return class_names[predicted_index], confidence

def predict_image3(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE_DENSENET)
    img_array = image.img_to_array(img)
    img_array = img_array / 223.0      
    img_array = np.expand_dims(img_array, axis=0)


    predictions = model3.predict(img_array)
    predicted_index = np.argmax(predictions)
    confidence = np.max(predictions)

    return class_names[predicted_index], confidence



image_path0= r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage\Potato_Healthy\0.JPG" 
image_path1 = r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage\Tomato_Late_Blight\0.JPG" 
image_path2 = r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage\Cauliflower_Downy_Mildew\Downy Mildew. (17).JPG"


image_paths = [image_path0, image_path1, image_path2]

print("From standard CNN :")
for i in range(3):
    label, conf = predict_image0(image_paths[i])
    print(f"Prediction {label}")
    print(f"Confidence : {conf:.2f}")

i = 0

print("From ResNet50V2 CNN :")
for i in range(3):
    label, conf = predict_image1(image_paths[i])
    print(f"Prediction {label}")
    print(f"Confidence : {conf:.2f}")

# print("From EfficientNet CNN :")
# for i in range(3):
#     label, conf = predict_image2(image_paths[i])
#     print(f"Prediction {label}")
#     print(f"Confidence : {conf:.2f}")


print("From DenseNet CNN :")
for i in range(3):
    label, conf = predict_image3(image_paths[i])
    print(f"Prediction {label}")
    print(f"Confidence : {conf:.2f}")

