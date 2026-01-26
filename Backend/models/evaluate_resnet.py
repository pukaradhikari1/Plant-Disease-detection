import tensorflow as tf

MODEL_PATH = r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\models\standard.keras"
DATASET_PATH = r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage"

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32

model = tf.keras.models.load_model(MODEL_PATH)

test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_PATH,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True
)

loss, accuracy = model.evaluate(test_ds)
print("Test Accuracy:", accuracy)
