from PIL import Image
from matplotlib import pyplot as plt
import numpy as np
import os

file = Image.open(os.getcwd() + "/data/dev_images/2/2_101.jpg")
file_matrix = np.asarray(file)
print(file_matrix)
file_matrix = file_matrix.reshape(1,1,45,45)
print("reshape", file_matrix)

file_matrix = file_matrix.reshape(45, 45, 1)
print(file_matrix)
# plt.imshow(file_matrix)
# plt.show()