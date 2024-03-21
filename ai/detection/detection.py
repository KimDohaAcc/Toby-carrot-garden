import tensorflow as tf

import io
import PIL
import numpy as np
import redis

from inceptionV3 import ref as inceptionV3
from json import loads

def detection(image_data, data_name, member_id, quiz_id, correct_answer, inceptionV3_model):

    # 이미지 데이터를 PIL.Image 객체로 변환합니다.
    image_load = PIL.Image.open(io.BytesIO(image_data))

    # 이미지를 NumPy 배열로 변환합니다.
    image = np.array(image_load)

    # 이미지 천저리
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, [299, 299])
    image = tf.expand_dims(image, 0)

    # 모델 구동
    prediction = inceptionV3_model.predict(image)[0]

    # 결과 후처리
    idx = prediction.argmax()
    result = inceptionV3[idx]
    print(result)

    r = redis.Redis(host='172.17.0.2', port=6379, db=0)

    if result == '' or result != correct_answer:
        result = 'Failure'
    r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
    r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
    r.close()
