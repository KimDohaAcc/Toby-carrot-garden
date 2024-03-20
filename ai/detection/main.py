from tensorflow.keras.applications.inception_v3 import InceptionV3

import tensorflow as tf
from keras.models import load_model
from tensorflow.keras.utils import img_to_array

import io
import PIL
import cv2
import random
import base64
import numpy as np

from inceptionV3 import ref as inceptionV3

from kafka import KafkaConsumer
from json import loads
from s3_reader import s3_image_reader

bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 토픽
str_topic_name = 'detection'

# 카프카 소비자 group1 생성
str_group_name = 'group1'
consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                         auto_offset_reset='earliest', # 가장 처음부터 소비
                         enable_auto_commit=True,
                         group_id=str_group_name,
                         value_deserializer=lambda x: loads(x.decode('utf-8')),
                         consumer_timeout_ms=60000 # 타임아웃지정(단위:밀리초)
                        )
inceptionV3_model = tf.keras.applications.InceptionV3(
        include_top=True,
        weights="imagenet",
        input_tensor=None,
        input_shape=None,
        pooling=None,
        classes=1000,
        classifier_activation="softmax",
    )

for message in consumer:
    print("그림 분석 요청", message)
    image_data = s3_image_reader(message.value['imageUrl'])
    # analyze_object(image_data, message.value['imageUrl'], message.value['memberId'], message.value['quizId'], message.value['correctAnswer'] )

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
    # 반환
    # answer_dto = ResultDto(image=image_b64, result=(result == imageDto.answer))