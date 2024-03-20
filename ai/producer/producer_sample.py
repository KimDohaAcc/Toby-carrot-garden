import base64

from kafka import KafkaProducer
from json import dumps
import time

def on_send_success(record_metadata):
    # 보낸데이터의 매타데이터를 출력한다
    print("record_metadata:", record_metadata)


# 카프카 서버
bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 공급자 생성
producer = KafkaProducer(bootstrap_servers=bootstrap_servers,
                         key_serializer=None,
                         value_serializer=lambda x: dumps(x).encode('utf-8'))

# 카프카 토픽
str_topic_name = 'detection'

# 이미지 테스트 - 물체 감지
image = 'emptyTest.jpg'

# 이미지 테스트 - 감정 분석
# image = 'emotion.jpg'

# 이미지를 Base64로 인코딩
# with open(image, 'rb') as file:
#     image = base64.b64encode(file.read()).decode('utf-8')

# {
#     “imageUrl” : “url”,
#     “memberId” : 1,
#     “quizId” : 13,
#     “correctAnswer” : “사과”
# }

# 데이터 생성_detection
# data = {"time": time.time(), "imageUrl": image, "memberId": 1, "quizId": 13, "correctAnswer": "backpack"}

# 데이터 생성_emotion
data = {"time": time.time(), "imageUrl": image, "memberId": 1, "quizId": 15, "correctAnswer": "fork"}

# 카프카 공급자 토픽에 데이터를 보낸다
producer.send(str_topic_name, value=data).add_callback(on_send_success).get(timeout=100)  # blocking maximum timeout

print('data:', data)