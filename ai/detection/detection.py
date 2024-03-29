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
import traceback

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

        print("가장 유사한 결과값  __ idx : ", idx, "  inceptionV3[idx] : ", inceptionV3[idx], flush=True)

        # result = 0
        # if correct_answer == "cup" and prediction[441] < 3:
        #     print("컵 유사도 : ", prediction[441], flush=True)
        #     result = "100"
        # if correct_answer == "bag" and prediction[414] < 3:
        #     print("가방 유사도 : ", prediction[414], flush=True)
        #     result = "100"

        # print(result, flush=True)

    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)
        traceback.print_exc()

    # try:
    #     print("redis 저장 시작", flush=True)
    #     r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
    #     r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
    #     r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
    #     r.close()
    #     print("redis 저장 완료", flush=True)
    #
    # except Exception as e:
    #     print("redis 에러 ", e, flush=True)