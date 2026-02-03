import tensorflow as tf
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
import os

# ======================
# CONFIGURATION
# ======================
DATASET_PATH = "../data/PlantVillage"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
FINE_TUNE_EPOCHS = 10

# ======================
# DATA GENERATORS
# ======================
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.15,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True
)

train_gen = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_gen = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

NUM_CLASSES = train_gen.num_classes

# ======================
# MODEL
# ======================
base_model = DenseNet121(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

base_model.trainable = False

x = GlobalAveragePooling2D()(base_model.output)
x = Dropout(0.5)(x)
output = Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=output)

# ======================
# COMPILE
# ======================
model.compile(
    optimizer=Adam(),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# ======================
# TRAINING (PHASE 1)
# ======================
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=EPOCHS
)

# ======================
# FINE-TUNING
# ======================
for layer in base_model.layers[-60:]:
    layer.trainable = True

model.compile(
    optimizer=Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history_fine = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=FINE_TUNE_EPOCHS
)

# ======================
# SAVE MODEL
# ======================
os.makedirs("../models", exist_ok=True)
model.save("../models/densenet121_plant_disease.h5")

print(" Training complete. Model saved.")
