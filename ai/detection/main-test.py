import tensorflow as tf
from detectionTest import detection
# from detection import detection
import os

# 이미지 디렉터리 경로 설정
image_directory = 'phone'
no_cup_directory = 'not-cup'

# 이미지 디렉터리 내 모든 파일 가져오기
cup_image_files = [(os.path.join(image_directory, f), f) for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f))]
no_cup_image_files = [(os.path.join(no_cup_directory, f), f) for f in os.listdir(no_cup_directory) if os.path.isfile(os.path.join(no_cup_directory, f))]



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

# 이미지 파일별로 detection 함수 호출
for image_file, filename in cup_image_files:
    with open(image_file, 'rb') as f:
        image_data = f.read()
        print(filename)
        # 각 이미지 파일에 대해 detection 함수 호출
        detection(image_data, "data_name", 1, 1, "bag", inceptionV3_model)



print("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨no-cup-images")

# 이미지 파일별로 detection 함수 호출
for image_file, filename in no_cup_image_files:
    with open(image_file, 'rb') as f:
        image_data = f.read()
        print(filename)
        # 각 이미지 파일에 대해 detection 함수 호출
        detection(image_data, "data_name", 1, 1, "cup", inceptionV3_model)