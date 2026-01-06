import cv2 as cv

def resize_and_write_image(input_path, output_path, size=(256, 256)):
    image = cv.imread(input_path)
    if image is None:
        print("Image could not be found")
        return
    
    resized_image = cv.resize(image, size)
    cv.imwrite(output_path, resized_image)
    print(f"Resized image saved to {output_path}")


def read_image(path):
    image = cv.imread(path)
    if image is None:
        print("Image could not be found")

    return image

def show_image(window_name, image):
    cv.imshow(window_name, image)
    cv.waitKey(0)
    cv.destroyAllWindows()

i = 'DATA/PlantVillage/Cauliflower_Healthy/No disease. (33).JPG'
o = 'DATA/PlantVillage/Cauliflower_Healthy/No disease. (33)_resized.JPG'

show_image("Cauliflower :)", read_image(i))

resize_and_write_image(i, o)


show_image("Cauliflower Resized :)", read_image(o))
cv.waitKey(0)