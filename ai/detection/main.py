import tensorflow as tf

from kafka import KafkaConsumer
from json import loads
from s3_reader import s3_image_reader
from detection import detection

bootstrap_servers = ["kafka:9092"]

# 카프카 토픽
str_topic_name = 'OBJECTS'

# 카프카 소비자 group1 생성
str_group_name = 'group1'
try:
    consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                             auto_offset_reset='earliest', # 가장 처음부터 소비
                             enable_auto_commit=True,
                             group_id=str_group_name,
                             value_deserializer=lambda x: loads(x.decode('utf-8'))
                            )
except Exception as e:
    print("카프카 소비자 생성 실패:", e, flush=True)

try:
    # 모델 로드
    inceptionV3_model = tf.keras.applications.InceptionV3(
        include_top=True,
        weights="imagenet",
        input_tensor=None,
        input_shape=None,
        pooling=None,
        classes=1000,
        classifier_activation="softmax",
    )
except Exception as e:
    print("모델 로드 실패:", e, flush=True)

for message in consumer:
    try:
        print("물체 감지 분석 요청", message, flush=True)
        image_data = s3_image_reader(message.value['imageKey'])

        if image_data is not None:
            detection(image_data, message.value['imageKey'], message.value['memberId'],
                      message.value['quizId'], message.value['correctAnswer'], inceptionV3_model)
    except Exception as e:
        print("물체 분석 실패:", e, flush=True)