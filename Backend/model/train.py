import tensorflow as tf
import os

#path configuration
DATASET_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\Data\PlantVillage"
MODEL_SAVE_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"
#parameters
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32 #image to be processed at a timr
EPOCHS_INITIAL = 15#training round with frozen resnet
EPOCHS_FINE_TUNE = 10
SEED = 123 #Ensure same train variation every time
# LOAD DATASET

train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=SEED,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_ds.class_names
num_classes = len(class_names)

print(" Classes (IMPORTANT — SAVE THIS ORDER):")
print(class_names)


AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)

# DATA AUGMENTATION

data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.15),
    tf.keras.layers.RandomZoom(0.1),
])


# BASE MODEL

base_model = tf.keras.applications.ResNet50(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)

base_model.trainable = False  

# BUILD MODEL
model = tf.keras.Sequential([
    data_augmentation,
    tf.keras.layers.Rescaling(1./255),  
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(256, activation="relu"),
    tf.keras.layers.Dropout(0.4),
    tf.keras.layers.Dense(num_classes, activation="softmax")
])


# COMPILE (STAGE 1)
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# TRAIN (STAGE 1)

print("\n Training (Frozen Base Model)...")
model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS_INITIAL
)


# FINE-TUNING (STAGE 2)

print("\n🔥 Fine-tuning ResNet50...")

base_model.trainable = True


for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS_FINE_TUNE
)


os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
model.save(MODEL_SAVE_PATH)

print("\n✅ Model trained & saved successfully!")
