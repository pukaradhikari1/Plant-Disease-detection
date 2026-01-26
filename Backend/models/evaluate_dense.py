import tensorflow as tf
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix
from tensorflow.keras.preprocessing.image import ImageDataGenerator

MODEL_PATH = "../models/densenet121_plant_disease.h5"
DATASET_PATH = "../data/PlantVillage"

model = tf.keras.models.load_model(MODEL_PATH)

datagen = ImageDataGenerator(rescale=1./255)

val_gen = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224,224),
    batch_size=32,
    class_mode='categorical',
    shuffle=False
)

y_true = val_gen.classes
y_pred = np.argmax(model.predict(val_gen), axis=1)

print(classification_report(y_true, y_pred))
