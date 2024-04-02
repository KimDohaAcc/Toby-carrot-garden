# locust 활용법

참고: https://docs.locust.io/en/stable/running-in-docker.html

## windows 실행법

- 로컬호스트에서 스프링부트를 실행시킨다.
- 다음 명령어를 실행한다.

```
docker run --name my_locust_container -p 8089:8089 --mount type=bind,source=%cd%,target=/mnt/locust locustio/locust -f /mnt/locust/locustfile.py
```

- localhost:8089에 접속한다.
- `http://host.docker.internal:8080` 호스트로 부하테스트를 보낸다.

### 명령어 설명

docker run: Docker 컨테이너를 실행하는 명령어입니다.

-p 8089:8089: 호스트의 포트 8089를 컨테이너의 포트 8089로 매핑합니다. 이렇게 하면 호스트에서 Locust 웹 인터페이스에 액세스할 수 있습니다.

--mount type=bind,source=$pwd,target=/mnt/locust: 호스트의 디렉토리를 컨테이너 내의 /mnt/locust 디렉토리에 마운트합니다. $pwd는 현재 작업 디렉토리를 나타내며, 호스트의 파일 시스템에서 Locust 설정 파일 (locustfile.py와 같은)에 접근할 수 있도록 합니다.

locustio/locust: Docker Hub에서 Locust 이미지를 가져옵니다. 이 이미지는 Locust를 실행하는 데 필요한 모든 것을 포함합니다.

-f /mnt/locust/locustfile.py: Locust에서 사용할 테스트 파일의 경로를 지정합니다. 이 경우 /mnt/locust/locustfile.py로 지정되었으므로 호스트의 파일 시스템에 있는 locustfile.py를 사용합니다.
