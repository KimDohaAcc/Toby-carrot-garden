import tensorflow as tf

import io
import PIL
import numpy as np
import redis

from inceptionV3 import ref as inceptionV3
from dotenv import load_dotenv
import os
from pathlib import Path
import traceback

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

cup_like = {
    438: 'cup',
    441: 'cup',
    647: 'cup',
    898: 'cup',
    968: 'cup',
    969: 'eggnog',
    504: 'coffee mug',
    720: 'pill bottle',
    572: 'goblet',
    899: 'water jug',
    901: 'whiskey jug',
    725: 'pitcher, ewer',
    849: 'teapot',
    503: 'cocktail shaker',
    653: 'milk can',
    440: 'bottle'
}

backpack_like = {
    414: 'backpack, back pack, knapsack, packsack, rucksack, haversack',
    # 678: 'neck brace',
    841: 'sweatshirt',
    411: 'apron',
    752: 'racket, racquet',
    465: 'bulletproof vest',
    399: 'abaya',
    # 834: 'suit, suit of clothes',
    877: 'turnstile',
    747: 'punching bag, punch bag, punching ball, punchball',
    # 197: 'giant schnauzer',
    # 424: 'barbershop',
    # 515: 'cowboy hat, ten-gallon hat',
    # 523: 'crutch',
    578: 'gown',
    636: 'mailbag, postbag',
    # 830: 'stretcher',
    # 608: 'jean, blue jean, denim',
    431: 'bassinet',
    # 480: 'cash machine, cash dispenser, automated teller machine, automatic teller machine, automated teller, automatic teller, ATM',
    617: 'lab coat, laboratory coat',
    # 859: 'toaster',
    # 570: 'gasmask, respirator, gas helmet',
    790: 'shopping basket',
}


def detection(image_data, data_name, member_id, quiz_id, correct_answer, inceptionV3_model):
    try:
        # 이미지 데이터를 PIL.Image 객체로 변환합니다.
        image_load = PIL.Image.open(io.BytesIO(image_data))

        # 이미지를 NumPy 배열로 변환합니다.
        image = np.array(image_load)

        # 이미지 천저리
        image = tf.image.convert_image_dtype(image, tf.float32)
        image = tf.image.resize(image, [299, 299])
        image = tf.expand_dims(image, 0)

        # 모델 구동
        prediction = inceptionV3_model.predict(image)[0]


        # top 5
        top_5_indices = np.argsort(prediction)[::-1][:5]

        target_dict = cup_like if correct_answer == "cup" else backpack_like

        result = 0
        for index in top_5_indices:
            is_answer = index in target_dict
            if (is_answer): result = 100
            print(
                f"인덱스: {index}  값: {inceptionV3[index]} 유사도: {prediction[index]}, 정답여부: {'😍정답' if is_answer else '😒오답'}",
                flush=True)

        print(f"결과: {result} {'💖정답' if result == 100 else '🐛오답'}")


    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)
        traceback.print_exc()

    try:
        print("redis 저장 시작", flush=True)
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
        r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
        r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
        r.close()
        print("redis 저장 완료", flush=True)

    except Exception as e:
        print("redis 에러 ", e, flush=True)