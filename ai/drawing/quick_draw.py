import numpy as np
from src.dataset import CLASSES
import torch
from PIL import Image
import redis
import os
from pathlib import Path
from dotenv import load_dotenv
from io import BytesIO
import traceback
import warnings
import cv2

# 파이토치 버전 관련한 에러 메세지
# 이 경고는 일반적으로 정보 제공용이며 코드에 문제가 있음을 나타내는 것은 아니므로 필터링
warnings.filterwarnings("ignore", message="source code of class 'torch.nn.modules.dropout.Dropout' has changed.")
warnings.filterwarnings("ignore", message="source code of class 'torch.nn.modules.container.Sequential' has changed.")
warnings.filterwarnings("ignore", message="source code of class 'torch.nn.modules.conv.Conv2d' has changed.")
warnings.filterwarnings("ignore", message="source code of class 'torch.nn.modules.activation.ReLU' has changed.")
warnings.filterwarnings("ignore", message="source code of class 'torch.nn.modules.pooling.MaxPool2d' has changed.")
warnings.filterwarnings("ignore", message="source code of class 'torch.nn.modules.linear.Linear' has changed.")

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")


def analyze_object(image_data, member_id, quiz_id, correct_answer):
    try:


        # Load model
        model = torch.load("trained_models/whole_model_quickdraw", map_location=lambda storage, loc: storage)
        model.eval()

        image = Image.open(BytesIO(image_data)).convert('L')
        image = image.convert('RGB')

        white_background = np.ones((640, 480, 3), dtype=np.uint8) * 255  # 흰색 배경 생성

        # 이미지 반전시키기
        image = Image.eval(image, lambda x: x)
        image = image.resize((640, 480), Image.LANCZOS)
        image = np.array(image)


        # Preprocess the image
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        ys, xs = np.nonzero(image)
        min_y = np.min(ys)
        max_y = np.max(ys)
        min_x = np.min(xs)
        max_x = np.max(xs)
        image = image[min_y:max_y, min_x: max_x]

        image = cv2.resize(image, (28, 28))
        image = np.array(image, dtype=np.float32)[None, None, :, :]
        image = torch.from_numpy(image)

        # Perform inference
        logits = model(image)

        top_values, top_indices = torch.topk(logits[0], k=10)
        result = 0

        for rank, (value, index) in enumerate(zip(top_values, top_indices), start=0):
            print(
                f"순위: {rank}  인덱스: {index}  값: {CLASSES[index]} 유사도: {value}",
                flush=True)
            if correct_answer == CLASSES[index]:
                result = 100 - (rank * 10)

        try:
            r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
            r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
            r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
            r.close()
            print("redis 저장 완료", flush=True)

        except Exception as e:
            print("redis 에러 ", e, flush=True)

    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)
        err_msg = traceback.format_exc()
        print(err_msg, flush=True)
