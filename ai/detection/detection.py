import tensorflow as tf

import io
import PIL
import numpy as np
import redis

from inceptionV3 import ref as inceptionV3
from json import loads
from dotenv import load_dotenv
import os
from pathlib import Path

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

def detection(image_data, data_name, member_id, quiz_id, correct_answer, inceptionV3_model):
    try:
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
    except Exception as e:
        print("모델 에러 발생 ", e)

    try:
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

        if result == '' or result != correct_answer:
            result = 'Failure'
        r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
        r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
        r.close()
        print("redis 저장 완료")

    except Exception as e:
        print("redis 에러 ", e)