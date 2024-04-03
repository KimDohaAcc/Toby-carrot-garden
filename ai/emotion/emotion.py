from keras.models import load_model
from keras.utils import image_utils

import cv2
import numpy as np
import redis
from dotenv import load_dotenv
import os
from pathlib import Path

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

def emotion(image_data, data_name, member_id, quiz_id, correct_answer):
    try:
        print("모델 분석 시작", flush=True)
    
        face_classifier = cv2.CascadeClassifier('model/haarcascade_frontalface_default.xml')
        classifier = load_model('model/Emotion_Detection.h5')
    
        class_labels = ['Angry', 'Happy', 'Neutral', 'Sad', 'Surprise']  # 감정 라벨
    
        # 이미지 데이터를 NumPy 배열로 변환
        nparr = np.frombuffer(image_data, np.uint8)
    
        # OpenCV로 이미지 로드
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
        # 얼굴 검출
        faces = face_classifier.detectMultiScale(gray, 1.3, 5)
    
        label = ''
        for (x, y, w, h) in faces:
            cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
            roi_gray = gray[y:y + h, x:x + w]
            roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)
    
            if np.sum([roi_gray]) != 0:
                roi = roi_gray.astype('float') / 255.0
                roi = image_utils.img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)
    
                # 감정 분석
                preds = classifier.predict(roi)[0]
                label = class_labels[preds.argmax()]
                print(f'😉 분석한 감정: {label}', flush=True)
                label_position = (x, y)
                cv2.putText(image, label, label_position, cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 3)


    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)

    try:
        # 네트워크 설정 필요
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

        if label == correct_answer:
            label = 100
        else:
            label = 0
            
        r.set(f'quiz_answer_{member_id}_{quiz_id}', label)
        r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
        r.close()
        print("redis 저장 완료", flush=True)

    except Exception as e:
        print("redis 에러 ", e, flush=True)

    print(f'분석 성공 - emotion {label}', flush=True)
    print("Image analysis complete. Result saved.", flush=True)
