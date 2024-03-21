FROM python:3.9.0

RUN mkdir -p /opt/ai

WORKDIR /opt/ai

COPY . .

RUN pip3 install --upgrade pip

RUN pip3 install tensorflow-cpu==2.12.0
RUN pip3 install redis==5.0.3
RUN pip3 install python-dotenv==1.0.1
RUN pip3 install pillow==10.2.0
RUN pip3 install opencv-python==4.7.0.72
RUN pip3 install boto3==1.34.66
RUN pip3 install kafka-python==2.0.2

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

CMD ["python", "main.py"]
