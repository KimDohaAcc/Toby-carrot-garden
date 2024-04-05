import numpy as np
from src.dataset import CLASSES
import torch
from PIL import Image
# import redis
# from dotenv import load_dotenv
from io import BytesIO
import os
import cv2



def save(image, title):
    # 이미지를 PIL 이미지 객체로 변환
    output_image = Image.fromarray(image)

    # 이미지를 저장할 경로 설정
    output_path = "out/" + title + ".png"

    # 이미지를 out.png로 저장
    output_image.save(output_path)

    print("이미지가 저장되었습니다:", output_path)


def draw(image_data, filename):
    # Load model
    model = torch.load("trained_models/whole_model_quickdraw", map_location=lambda storage, loc: storage)
    model.eval()



    image = Image.open(BytesIO(image_data)).convert('L')
    image = image.convert('RGB')
    save(np.array(image), filename+"_01_불러오기")


    white_background = np.ones((640, 480, 3), dtype=np.uint8) * 255  # 흰색 배경 생성

    # 이미지 반전시키기
    image = Image.eval(image, lambda x: x)
    # image = image.resize((28, 28), Image.LANCZOS)
    image = image.resize((28, 28))
    image = np.array(image)
    save(image,  filename+"_02_인터폴레이션_없이_리사이즈")
    # save(image, "인터폴레이션")


    # Preprocess the image
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    ys, xs = np.nonzero(image)
    min_y = np.min(ys)
    max_y = np.max(ys)
    min_x = np.min(xs)
    max_x = np.max(xs)
    image = image[min_y:max_y, min_x: max_x]
    save(image, filename+"_03_크롭")

    image = image.resize((28, 28), Image.LANCZOS)
    image = cv2.resize(image, (28, 28))

    save(image, filename+"_04_리사이즈")
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
        # if correct_answer == CLASSES[index]:
        #     result = 100 - (rank * 10)


# 이미지 디렉터리 경로 설정
image_directory = 'image'

# 이미지 디렉터리 내 모든 파일 가져오기
image_files = [(os.path.join(image_directory, f), f) for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f))]

# 이미지 파일별로 detection 함수 호출
for image_file, filename in image_files:
    with open(image_file, 'rb') as f:
        image_data = f.read()
        print(filename)
        # 각 이미지 파일에 대해 detection 함수 호출
        draw(image_data, filename)






# if __name__ == '__main__':
#     main()
