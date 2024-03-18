import cv2
import torch
import numpy as np
from PIL import Image

def detect_yolov5(image_data, data_name):
    # Model
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

    # Images
    # for f in 'zidane.jpg', 'bus.jpg':
    #     torch.hub.download_url_to_file('https://ultralytics.com/images/' + f, f)  # download 2 images
    # im1 = Image.open('zidane.jpg')  # PIL image
    # im2 = cv2.imread('bus.jpg')[..., ::-1]  # OpenCV image (BGR to RGB)

    image_np = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)

    results = model(image_np)

    # Inference
    # results = model([im1, im2], size=640) # batch of images

    # Results
    results.print()
    results.save()  # or .show()

    results.xyxy[0]  # im1 predictions (tensor)
    results.pandas().xyxy[0]  # im1 predictions (pandas)