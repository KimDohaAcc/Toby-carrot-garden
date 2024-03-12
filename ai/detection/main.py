from kafka import KafkaConsumer
from json import loads
import cv2
import numpy as np
import base64

import os
import subprocess

# 카프카 서버
bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 토픽
str_topic_name = 'Topic2'

# 카프카 소비자 group1 생성
str_group_name = 'group2'
consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                         auto_offset_reset='earliest', # 가장 처음부터 소비
                         enable_auto_commit=True,
                         group_id=str_group_name,
                         value_deserializer=lambda x: loads(x.decode('utf-8')),
                         consumer_timeout_ms=60000 # 타임아웃지정(단위:밀리초)
                        )

for message in consumer:
    print("detection 모델 테스트", message)

    # 이미지 파일 경로
    image_data_base64 = message.value['image']
    image_data = base64.b64decode(image_data_base64)

    # 이미지를 numpy 배열로 변환
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 필요한 경로 및 변수 설정
    HOME = "content/"
    weights_path = os.path.join(HOME, "weights", "gelan-c.pt")
    source_path = os.path.join(HOME, "data", "dog.jpeg")
    device = "cpu"

    # 명령어 실행
    # command = f"python detect.py --weights {weights_path} --conf 0.1 --source {source_path} --device {device}"
    # subprocess.run(command, shell=True)
    command = f"python detect.py --weights {weights_path} --source {source_path} --conf 0.1 --device {device}"
    # command = f"python detect.py --weights --conf 0.1 --source {HOME}/data/bags.jpg --device 0"
    # command = f"python detect.py --img 640 --conf 0.1 --device cpu --weights {weights_path} --source {source_path}"
    subprocess.run(command, shell=True)

    print("Image analysis complete. Result saved.")