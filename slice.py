# Importing Image class from PIL module 
from PIL import Image 
# Importing glob to list all images in folder 
import glob
# Importing re for sorting the list with images 
import re

sliceHeight = 1698 # The height of the slice
def sliceImage(image):
    '''slice image into multiple slices with fixed height'''
    slices = []
    w = image.size[0]
    h = image.size[1]
    print(w,h,sliceHeight)
    if h > sliceHeight:
        topSlice = image.crop((0, 0, w, sliceHeight))
        bottomSlice = image.crop((0, sliceHeight, w, h))
        slices.append(topSlice)
        sliceBottom = sliceImage(bottomSlice)
        slices += sliceBottom
        return slices
    return [image]

j=1
file = open("imageList.txt", "w") 
for val in sorted(glob.glob('./*.png'), key=lambda x:float(re.findall("(\d+)",x)[0])):
    im = Image.open(val) # Open the image
    for image in sliceImage(im):
        image.save('./final/'+str(j)+'.png','PNG') # save the slices
        file.write('./final/'+str(j)+'.png\n') # save slice to imageList
        j+=1
file.close() 