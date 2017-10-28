from PIL import Image
from matplotlib import pyplot as plt
import numpy as np
import os
from random import *
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution2D, MaxPooling2D
from keras import backend as K
K.set_image_dim_ordering('th')
from keras.utils import np_utils
from keras.models import save_model

folders = os.listdir(os.getcwd() + "\data\extracted_images")
test_label = []
test_data = []
train_label = []
train_data = []

def makeBinaryList(index, length):
    list = []
    for num in range(0,length):
        if(num == index):
            list.append(1)
        else:
            list.append(0)
    return list


for index in range(0, len(folders)):
    folder = folders[index]
    print(folder)
    count = 0
    for filename in os.listdir(os.getcwd() + "\data\extracted_images" + "\\" + folder):
        count += 1
        if count > 5000:
            break

        file = Image.open(os.getcwd() + "\data\extracted_images" + "\\" + folder + "\\" + filename)
        file_matrix = np.asarray(file)
        if randint(1, 100) <= 10:
            test_data.append(file_matrix)
            test_label.append(makeBinaryList(index, len(folders)))
        else:
            train_data.append(file_matrix)
            train_label.append(makeBinaryList(index, len(folders)))

test_label =  np.array(test_label)
test_data = np.array(test_data)
train_data = np.array(train_data)
train_label = np.array(train_label)

# test_label = np_utils.to_categorical(test_label, 10)
# test_data = np_utils.to_categorical(test_data, 10)

#adding in depth param for model architecture
test_data = test_data.reshape(test_data.shape[0], 1, 45, 45)
train_data = train_data.reshape(train_data.shape[0], 1, 45, 45)

#Sequential model
model = Sequential()
#Input layer
model.add(Convolution2D(32, 3, 3, activation='relu', input_shape=(1,45,45)))

print(test_label.shape)
print(test_label)
print(train_label.shape)
print(train_label)

#more layers
model.add(Convolution2D(32, 3, 3, activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
#Dropout layer prevents overfitting
model.add(Dropout(0.25))

#adding fully connected layer and output layer
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(folders), activation='softmax'))

#compiling model, delcares loss function and the optimizer
model.compile(loss='categorical_crossentropy', optimizer='adam',
              metrics=['accuracy'])

#fitting training data
model.fit(train_data, train_label, batch_size=32, nb_epoch=10, verbose=1)
#test data evaluation
score = model.evaluate(test_data, test_label, verbose=0)

print(score)

model.save("model3.h5")
# for filename in os.listdir(os.getcwd() + "\sixes"):
#     test6 = Image.open("sixes\\" + filename)
#     test6mat = np.asarray(test6)
#     print(test6mat.shape)
#
#     plt.imshow(test6mat)
#     plt.show()

# test6 = Image.open("sixes\\test6.jpg")
# test6mat = np.asarray(test6)
# test6mat = np.asarray(test6)
# print(test6mat.shape)
#
# test6mat= np.reshape(test6mat, (3, 1200, 1800))
# print(test6mat.shape)
# plt.imshow(test6mat)
# plt.show()


