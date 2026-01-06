import cv2 as cv
import numpy as np

def read_image(path):
    image = cv.imread(path)
    if image is None:
        print("Image could not found")
    
    image = cv.resize(image, (256,256))

    return image

def show_image(window_name, image):
    cv.imshow(window_name, image)
    cv.waitKey(0)
    cv.destroyAllWindows()

p = 'DATA/PlantVillage/Cauliflower_Healthy/No disease. (33).JPG'

show_image("Cauliflower :)", read_image(p))

# img = cv.imread('DATA/PlantVillage/Potato_Healthy/0.JPG')

# cv.imshow('Potato :)', img)
# cv.waitKey(0)
# cv.destroyAllWindows()