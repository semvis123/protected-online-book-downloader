# protected-online-book-downloader
This can be used to download protected online books, it screenshots every page then combines it into a searchable pdf.

# How to use?
1. enter the url of the first page of the book into index.js
2. enter your cookie information into index.js
3. find the page (this part will be screenshotted) selector (inspect element) and enter it in index.js
4. find the next page selector (inspect element) and enter it in index.js
(5. optional) disable headless mode so you can see what happens
6. run '$ npm i'
7. run '$ node index.js'
8. check if everything went well, you should see your pages as images in the directory
9. install pillow for python
10. run '$ python slice.py' to slice the tall images into smaller ones and create a textfile for tesseract. (besure to calculate the correct sliceHeight with a4 aspect ratio)
11. install tesseract
12. run the following command to recognise the text in the image and merge everything into one pdf file. '$ tesseract imageList.txt book PDF'




*for educational purposes only 
