import cv2
import os

def process_image(image_path, label, output_dir="Data/PlantVillage/"):
    img = cv2.imread(image_path)
    if img is None:
        print("Could not read image:", image_path)
        return

    h, w = img.shape[:2]
    size = min(h, w)

    # center crop
    start_x = (w - size) // 2
    start_y = (h - size) // 2
    cropped = img[start_y:start_y+size, start_x:start_x+size]

    # resize to 256x256
    resized = cv2.resize(cropped, (256, 256))

    # create label folder
    save_dir = os.path.join(output_dir, label)
    os.makedirs(save_dir, exist_ok=True)

    # save image
    filename = os.path.basename(image_path)
    save_path = os.path.join(save_dir, filename)
    cv2.imwrite(save_path, resized)

    print("Saved:", save_path)


# example usage
label_name = "Cauliflower_Healthy"
images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg"
]

for img_path in images:
    process_image(img_path, label_name)
