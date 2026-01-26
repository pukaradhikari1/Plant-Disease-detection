import tensorflow as tf

<<<<<<< HEAD:Backend/model/evaluate.py
MODEL_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"
DATASET_PATH = r"C:\Users\Hp Victus\Desktop\project 4\Backend\Data\PlantVillage"
=======
MODEL_PATH = r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\models\standard.keras"
DATASET_PATH = r"C:\Users\Sakar\Documents\GitHub\Plant-Disease-detection\Backend\Data\PlantVillage"
>>>>>>> 838a468dad34432eb77b208aebef3cd4a346e84e:Backend/models/evaluate_resnet.py

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32

# Load Keras model (FULLY supported in Keras 3)
model = tf.keras.models.load_model(MODEL_PATH)

# Load dataset
test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_PATH,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True
)

# (Optional but recommended if you trained with normalized images)
test_ds = test_ds.map(lambda x, y: (x / 255.0, y))

# Evaluate
loss, accuracy = model.evaluate(test_ds)
print("Test Accuracy:", accuracy)
