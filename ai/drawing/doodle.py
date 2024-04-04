import tensorflow as tf
from keras.models import load_model
import numpy as np
import cv2
from classes.doodle_ref import ref as doodle_ref
import redis
from dotenv import load_dotenv
import os
import traceback
from pathlib import Path


dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")


def find_object_index(object_name):
    target_index = 0
    for i, v in enumerate(doodle_ref):
        if v == object_name:
            target_index = i
            break
    return target_index


def analyze_object(image_data, object_name, member_id, quiz_id, correct_answer):
    try:
        doodle_model = load_model("model/doodle_cnn.h5")

        target_index = find_object_index(correct_answer)

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

        print("일치율 확인", flush=True)

        probabilities = np.exp(prediction) / np.sum(np.exp(prediction))  # 소프트맥스 함수를 사용하여 로짓 값을 확률로 변환

        print("{:2.0f}".format(float(100*np.max(probabilities[0]))), flush=True)
        print(doodle_ref[np.argmax(probabilities[0])], flush=True)

        # formatted_probabilities = ["{:2.0f}".format(prob * 100) for prob in probabilities]
        # print("---------------------------"+formatted_probabilities)
        # print("---------------------------" + formatted_probabilities[target_index])
        # 백분율로 환산
        # percentages = probabilities * 100
        # print(percentages, flush=True)

        # percentage_values = [value * 100 for value in probabilities]
        # print(percentage_values, flush=True)
        #
        # for idx, value in enumerate(percentage_values[0]):
        #     if idx == target_index:
        #         print(f"인덱스 번호 {target_index} 값: {value}", flush=True)

        # 결과
        # result = prediction[target_index] + 100
        result=0

    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)
        traceback.print_exc()

    try:
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
        r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
        r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
        r.close()
        print("redis 저장 완료", flush=True)

    except Exception as e:
        print("redis 에러 ", e, flush=True)

    # print(prediction)
    print(f"{doodle_ref[target_index]}는  {100 + prediction[0][target_index]}%", flush=True)
