from keras.models import load_model
from PIL import Image
import numpy as np
import os
from resizeimage import resizeimage

model = load_model("MNIST model")

file = Image.open(os.getcwd() + "/data/dev_images/0/0_616.jpg")
file = resizeimage.resize_cover(file, [28, 28])
file_matrix = np.asarray(file)

file_matrix.flags.writeable = True
#print(file_matrix.size)
for row in range(0, 28):
    for col in range(0, 28):
        file_matrix[row,col] = 255-file_matrix[row,col]

file_matrix = file_matrix.reshape(1,1,28,28)
prediction = model.predict(file_matrix)
print(prediction)