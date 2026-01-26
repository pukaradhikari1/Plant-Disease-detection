import tensorflow as tf

old_path = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet"
new_path = r"C:\Users\Hp Victus\Desktop\project 4\Backend\saved_model\plant_disease_resnet.keras"

model = tf.keras.models.load_model(old_path)
model.save(new_path)

print("Model converted successfully.")
