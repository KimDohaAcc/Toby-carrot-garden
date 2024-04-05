from kafka import KafkaConsumer
from json import loads
from s3_reader import s3_image_reader
from emotionTest import emotion
import os

# 이미지 디렉터리 경로 설정
image_directory = 'sad'
image_2_directory = 'neutral'

# 이미지 디렉터리 내 모든 파일 가져오기
image_files = [(os.path.join(image_directory, f), f) for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f))]
image_2_image_files = [(os.path.join(image_2_directory, f), f) for f in os.listdir(image_2_directory) if os.path.isfile(os.path.join(image_2_directory, f))]

# 이미지 파일별로 detection 함수 호출
for image_file, filename in image_files:
    with open(image_file, 'rb') as f:
        image_data = f.read()
        print(filename)
        # 각 이미지 파일에 대해 detection 함수 호출
        emotion(image_data, 'key', 1, 1, 'Sad')


print("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
# 이미지 파일별로 detection 함수 호출
for image_file, filename in image_2_image_files:
    with open(image_file, 'rb') as f:
        image_data = f.read()
        print(filename)
        # 각 이미지 파일에 대해 detection 함수 호출
        emotion(image_data, 'key', 1, 1, 'Neutral')
