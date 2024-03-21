from kafka import KafkaConsumer
from json import loads
from doodle import analyze_object
from s3_reader import s3_image_reader

bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 토픽
str_topic_name = 'drawing'

# 카프카 소비자 group1 생성
str_group_name = 'group1'
consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                         auto_offset_reset='earliest', # 가장 처음부터 소비
                         enable_auto_commit=True,
                         group_id=str_group_name,
                         value_deserializer=lambda x: loads(x.decode('utf-8')),
                        )
for message in consumer:
    print("그림 분석 요청", message)
    image_data = s3_image_reader(message.value['imageUrl'])
    analyze_object(image_data, message.value['imageUrl'], message.value['memberId'], message.value['quizId'], message.value['correctAnswer'] )
