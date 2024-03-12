from kafka import KafkaConsumer
from json import loads
from keras.models import load_model
from keras.preprocessing.image import img_to_array, load_img
import cv2
import numpy as np
import base64

# 카프카 서버
bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 토픽
str_topic_name = 'Topic1'

# 카프카 소비자 group1 생성
str_group_name = 'group1'
consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                         auto_offset_reset='earliest', # 가장 처음부터 소비
                         enable_auto_commit=True,
                         group_id=str_group_name,
                         value_deserializer=lambda x: loads(x.decode('utf-8')),
                         consumer_timeout_ms=60000 # 타임아웃지정(단위:밀리초)
                        )

for message in consumer:
    print("emotion 모델 테스트", message)
    face_classifier = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
    classifier = load_model('./Emotion_Detection.h5')

    class_labels = ['Angry', 'Happy', 'Neutral', 'Sad', 'Surprise']  # 감정 라벨

    # 이미지 파일 경로
    image_data_base64 = message.value['image']
    image_data = base64.b64decode(image_data_base64)

    # 이미지를 numpy 배열로 변환
    nparr = np.frombuffer(image_data, np.uint8)

    # OpenCV로 이미지 로드
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 얼굴 검출
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

        if np.sum([roi_gray]) != 0:
            roi = roi_gray.astype('float') / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)

            # 감정 분석
            preds = classifier.predict(roi)[0]
            label = class_labels[preds.argmax()]
            label_position = (x, y)
            cv2.putText(image, label, label_position, cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 3)

    # 결과 이미지 저장
    cv2.imwrite('result_image.jpg', image)

    # 결과 텍스트 파일 저장
    # with open('result.txt', 'w') as f:
    #     f.write("Predicted Emotion: {}".format(label))

    print("Image analysis complete. Result saved.")

