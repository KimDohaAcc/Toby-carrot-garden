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

cup = [3, 60, 117, 122, 248, 250, 347, 438, 440, 463, 470, 497, 503, 504, 512, 518, 572, 575, 626, 647, 659, 688, 719, 725, 727, 738, 766, 778, 792, 809, 813, 835, 849, 859, 876, 898, 899, 901, 968]
bag = [406, 414, 456, 463, 464, 520, 529, 533, 553, 569, 588, 591, 636, 665, 692, 701, 728, 747, 748, 785, 790, 797, 840, 893]

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
        # result = inceptionV3[idx]

        print("분석 결과  : " + inceptionV3[idx], flush=True)

        print("prediction[483] : ", prediction[483])

        print("prediction[414] _ bag : ", prediction[414])

        print("prediction[438] : ", prediction[438])
        print("prediction[441] : ", prediction[441])
        print("prediction[647] : ", prediction[647])
        print("prediction[898] : ", prediction[898])
        print("prediction[968] : ", prediction[968])


        result = 0

        if correct_answer == "cup" and prediction[438] < 4:
            result = "100"
        if correct_answer == "bag" and prediction[414] < 4:
            result = "100"



        print(result, flush=True)
    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)

    try:
        print("redis 저장 시작", flush=True)
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
        r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
        r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
        r.close()
        print("redis 저장 완료", flush=True)

    except Exception as e:
        print("redis 에러 ", e, flush=True)