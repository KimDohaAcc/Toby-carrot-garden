FROM python:3.10.11

ARG dir_name=detection

WORKDIR /app

COPY ${dir_name} /app/
## 지정된 폴더를 /app으로 옮긴다.

RUN pip3 install --no-cache-dir -r requirements.txt
## pip : 파이썬의 라이브러리 설치하는 명령어
## pip 버전명시해야함

CMD ["python", "main.py"]