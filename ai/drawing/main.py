from kafka import KafkaConsumer
from json import loads
from quick_draw import analyze_object
from s3_reader import s3_image_reader

bootstrap_servers = ["kafka:9092"]

# 카프카 토픽
str_topic_name = 'DRAWINGS'

# 카프카 소비자 group1 생성
str_group_name = 'group1'

try:
    consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                             auto_offset_reset='earliest', # 가장 처음부터 소비
                             enable_auto_commit=True,
                             group_id=str_group_name,
                             value_deserializer=lambda x: loads(x.decode('utf-8')),
                            )
except Exception as e:
    print("카프카 소비자 생성 실패:", e, flush=True)

for message in consumer:
    try:
        print("그림 분석 요청", message, flush=True)
        image_data = s3_image_reader(message.value['imageKey'])
        analyze_object(image_data, message.value['memberId'], message.value['quizId'], message.value['correctAnswer'] )
    except Exception as e:
        print("그림 분석 실패:", e, flush=True)

# image_data = s3_image_reader("031df2aa-d1da-42a9-8516-92aa6a948ed3")
# analyze_object(image_data, 1, 1, 'cloud')
