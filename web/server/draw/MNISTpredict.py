from keras.models import load_model
from PIL import Image
import numpy as np
import os
from resizeimage import resizeimage

def save(bytestream, filename):
    with open('data/' + filename, 'wb') as f:
        f.write(bytestream)

def evaluate(file):
    model = load_model("MNIST model")

    file = Image.open(os.path.join(os.getcwd(), "data", file))
    file = resizeimage.resize_cover(image, [28, 28])
    file_matrix = np.asarray(file)

    file_matrix.flags.writeable = True
    #print(file_matrix.size)
    for row in range(0, 28):
        for col in range(0, 28):
            file_matrix[row,col] = 255-file_matrix[row,col]

    file_matrix = file_matrix.reshape(1,1,28,28)
    prediction = model.predict(file_matrix)
    print(prediction)
