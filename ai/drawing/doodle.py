from pydantic import BaseModel
import tensorflow as tf
from keras.models import load_model
import PIL
import numpy as np
import cv2
from classes.doodle_ref import ref as doodle_ref

def find_object_index(object_name):
    target_index = 0
    for i, v in enumerate(doodle_ref):
        if v == object_name:
            target_index = i
            break
    return target_index


def analyze_object(image_data, data_name, object_name):
    doodle_model = load_model("model/doodle_cnn.h5")

    target_index = find_object_index(object_name)

    # 이미지 데이터를 NumPy 배열로 변환
    nparr = np.frombuffer(image_data, np.uint8)

    # OpenCV로 이미지 로드
    image_load = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 이미지를 NumPy 배열로 변환합니다.
    image_array = np.array(image_load)

    # numpy 배열을 TensorFlow tensor로 변환
    image_tensor = tf.convert_to_tensor(image_array, dtype=tf.float32)
    # 이미지의 크기를 (128, 128, 3)으로 조정
    image_tensor = tf.image.resize(image_tensor, (128, 128))
    image_tensor = tf.expand_dims(image_tensor, 0)

    # 모델 구동
    prediction = doodle_model.predict(image_tensor)

    # 결과 후처리
    idx = prediction.argmax()
    result = doodle_ref[idx]

    # print(prediction)
    print(f"{doodle_ref[target_index]}는~~{100 + prediction[0][target_index]}%")

# if __name__ == "__main__":
#     analyze_object()
