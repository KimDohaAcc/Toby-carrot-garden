import boto3
import os
from dotenv import load_dotenv
from pathlib import Path


dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

def s3_connection():
    try:
        # s3 클라이언트 생성
        s3 = boto3.client(
            service_name="s3",
            region_name=AWS_DEFAULT_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return s3


def s3_image_reader(s3_key):
    # s3 connection
    s3 = s3_connection()

    # S3에서 이미지 읽기
    response = s3.get_object(Bucket=AWS_BUCKET_NAME, Key=s3_key)
    image_data = response['Body'].read()
    _, extension = os.path.splitext(s3_key)
    print("s3 객체 읽기 성공")

    return image_data, extension
