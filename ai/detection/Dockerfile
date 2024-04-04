# 라이브러리 이미지를 기반으로 함
FROM woori2014/toby-ai-base:latest

RUN mkdir -p /opt/ai

WORKDIR /opt/ai

COPY . .

# 컨테이너에서 실행될 명령어 지정
CMD ["python", "main.py"]