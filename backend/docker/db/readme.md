# 실행 방법

- windows인 경우 git bash에서 실행시켜야 합니다.
- src/main/resources/.env 파일이 있어야 합니다.
    ``` 
    # MySQL
    MYSQL_ROOT_PASSWORD=your_root_password
    MYSQL_DATABASE=your_database_name
    MYSQL_USER=your_mysql_user
    MYSQL_PASSWORD=your_mysql_password
    
    # Redis
    REDIS_PASSWORD=your_redis_password
    ```
- 현재 디렉터리에서 다음 명령어 실행시키세요. </br>
  `./docker-compose.sh`
