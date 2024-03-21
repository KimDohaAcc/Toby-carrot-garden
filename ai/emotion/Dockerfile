# 라이브러리 이미지를 기반으로 함
FROM wldnjs35242/a202tobypython:1.0

RUN mkdir -p /opt/ai

WORKDIR /opt/ai

COPY . .

# 컨테이너에서 실행될 명령어 지정
CMD ["python", "main.py"]