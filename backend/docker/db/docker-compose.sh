#!/bin/bash

# .env 파일의 경로를 환경 변수로 설정
export ENV_FILE_PATH="./../../src/main/resources/.env"

# Docker Compose 실행
docker-compose -f docker-compose.yml --env-file $ENV_FILE_PATH up
