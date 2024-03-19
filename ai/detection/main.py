from kafka import KafkaConsumer
from json import loads
import os
import subprocess
from s3_reader import s3_image_reader
import tempfile
import sys

# 카프카 서버
bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 토픽
str_topic_name = 'detection'

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
    print("detection 모델 테스트")
    print(message)
    image_data, extension = s3_image_reader(message.value['imageUrl'])

    # 이미지 데이터를 임시 파일로 저장
    with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as temp_file:
        temp_file.write(image_data)
        temp_file_path = temp_file.name

    # 필요한 경로 및 변수 설정
    HOME = "content/"
    weights_path = os.path.join(HOME, "weights", "gelan-c.pt")
    device = "cpu"

    # detect.py 스크립트를 실행하는 명령어 생성
    correct_answer = message.value['correctAnswer']
    quiz_id = message.value['quizId']
    member_id = message.value['memberId']

    python_executable = sys.executable

    command = (f"{python_executable} detect.py --weights {weights_path} "
               f"--source {temp_file_path} --conf 0.1 --device {device} "
               f"--member_id {member_id} --quiz_id {quiz_id} --correct_answer {correct_answer}")
    # subprocess.run()으로 명령어 실행
    subprocess.run(command, shell=True)

    # 임시 파일 삭제
    os.unlink(temp_file_path)

    print("Image analysis complete. Result saved.")