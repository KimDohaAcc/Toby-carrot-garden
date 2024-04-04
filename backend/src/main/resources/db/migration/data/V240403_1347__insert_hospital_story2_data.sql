INSERT INTO rabbit.scene_data (id, created_time, updated_time, content, scene_image_url, scene_type, voice_url,
                               story_data_id)
VALUES (30, '2024-04-03 13:48:00.000000', '2024-04-03 13:48:00.000000', '토비가 코끼리 친구 코코의 병문안을 왔어요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/hospital/story02/001.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/hospital/story02/01.mp3', 4),
       (31, '2024-04-03 13:48:00.000000', '2024-04-03 13:48:00.000000',
        '친구가 아파서 토비는 슬퍼요.
어떤 표정을 짓고 있을까요?',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/hospital/story02/002.png', 'QUIZ',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/hospital/story02/02.mp3', 4),
       (32, '2024-04-03 13:48:00.000000', '2024-04-03 13:48:00.000000', '친구가 아플 때는 위로해 주세요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/hospital/story02/003.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/hospital/story02/03.mp3', 4),
       (33, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '[토비의 병문안] 이야기 완료!
기념 사진을 찍어보아요!',
        '', 'CLEAR', 'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/hospital/story02/04.mp3',
        4);

insert into rabbit.quiz_data (id, created_time, updated_time, correct_answer, quiz_type, scene_data_id)
values (10, '2024-04-03 13:48:00.000000', '2024-04-03 13:48:00.000000', 'Sad', 'FEELINGS', 31);