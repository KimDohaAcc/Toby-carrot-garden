from locust import HttpUser, task, between

class MyUser(HttpUser):
    # wait_time = between(0.1, 0.5)  # 각 요청 간 대기 시간 (초)
    
    def on_start(self):
        self.access_token = "YOUR_ACCESS_TOKEN_HERE"  # 여기에 실제 토큰 값을 넣어야 합니다.

    @task
    def my_task(self):
        headers = {"Authorization": f"Bearer {self.access_token}"}
        response = self.client.get("/api/hello/", headers=headers)
        if response.status_code == 200:
            print("Request successful")
            print(response.text)  # 응답 내용 출력
        else:
            print("Request failed")
            print(f"Response code: {response.status_code}")  # 응답 코드 출력
            print(response.text)  # 실패한 경우에도 응답 내용 출력