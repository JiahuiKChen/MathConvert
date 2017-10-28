from keras.models import load_model
from PIL import Image
import numpy as np
import os
from resizeimage import resizeimage

def save(bytestream, filename):
    with open(filename, 'wb') as dest:
        for chunk in bytestream.chunks():
            dest.write(chunk)

def evaluate(file):
    model = load_model(os.path.join(os.getcwd(), "themodel"))

    file = Image.open(os.path.join(os.getcwd(), file))

    file = file.convert('1')

    #file = resizeimage.resize_cover(file, [28, 28])
    file_matrix = np.asarray(file)

    file_matrix.flags.writeable = True
    #print(file_matrix.size)
    #for row in range(0, 28):
        #for col in range(0, 28):
            #file_matrix[row,col] = 255-file_matrix[row,col]

    file_matrix = file_matrix.reshape(1,1,28,28)
    prediction = model.predict(file_matrix)

    max = 0
    maxi = 0
    for i in range(len(prediction[0])):
        if prediction[0][i] > max:
            max = prediction[0][i]
            maxi = i

    return str(maxi)
