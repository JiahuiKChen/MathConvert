from keras.models import load_model
from PIL import Image
import numpy as np
import os

model = load_model("model3epoch10")

file = Image.open(os.getcwd() + "/data/dev_images/0/0_280.jpg")
file_matrix = np.asarray(file)
file_matrix = file_matrix.reshape(1,1,45,45)
prediction = model.predict(file_matrix)
print(prediction)
