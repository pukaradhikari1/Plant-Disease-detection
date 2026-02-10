import tensorflow as tf
import os
import json



DATASET_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\Data\PlantVillage"
MODEL_SAVE_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"
CLASS_NAMES_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\class_names.json"


#parameters for training

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS_INITIAL = 15
EPOCHS_FINE_TUNE = 10
SEED = 123


# loading datata set s 

train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=SEED,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int"
)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int"
)


#saving class name in json
class_names = train_ds.class_names
num_classes = len(class_names)

print("\nClasses (FINAL ORDER):")
print(class_names)

os.makedirs(os.path.dirname(CLASS_NAMES_PATH), exist_ok=True)
with open(CLASS_NAMES_PATH, "w") as f:
    json.dump(class_names, f)

print("class_names.json saved successfully")


# opt

AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)


#data agumentation

data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.15),
    tf.keras.layers.RandomZoom(0.1),
])


#base modl   res net 50

base_model = tf.keras.applications.ResNet50(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)

base_model.trainable = False

preprocess_input = tf.keras.applications.resnet50.preprocess_input


#building model

inputs = tf.keras.Input(shape=(224, 224, 3))
x = data_augmentation(inputs)
x = preprocess_input(x)              
x = base_model(x, training=False)    
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dense(256, activation="relu")(x)
x = tf.keras.layers.Dropout(0.4)(x)
outputs = tf.keras.layers.Dense(num_classes, activation="softmax")(x)

model = tf.keras.Model(inputs, outputs)




checkpoint = tf.keras.callbacks.ModelCheckpoint(
    MODEL_SAVE_PATH,
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)

early_stop = tf.keras.callbacks.EarlyStopping(
    monitor="val_loss",
    patience=5,
    restore_best_weights=True
)


#compiling

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)


#training

print("\nTraining (Frozen ResNet50)...")
model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS_INITIAL,
    callbacks=[checkpoint, early_stop]
)


#fine tuning training 
print("\n Fine-tuning ResNet50...")

base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS_FINE_TUNE,
    callbacks=[checkpoint, early_stop]
)


#saving the model after training

os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
model.save(MODEL_SAVE_PATH)

print("\n Model trained & saved successfully!")
print(" Training, prediction & Flask pipeline are now CONSISTENT")
