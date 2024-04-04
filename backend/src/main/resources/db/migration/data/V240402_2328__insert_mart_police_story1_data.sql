-- 경찰서
insert into rabbit.story_data (id, created_time, updated_time, recommend_age, story_image_url, title, place_data_id)
values (5, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', '3~4세',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/police/story01/000.png', '길을 잃었어요', 3);

INSERT INTO rabbit.scene_data (id, created_time, updated_time, content, scene_image_url, scene_type, voice_url,
                               story_data_id)
VALUES (23, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', '길을 잃은 토비는 경찰서에 신고하려고 해요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/police/story01/001.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/police/story01/01.mp3', 5),
       (24, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000',
        '경찰서에 신고하려면 어디에 전화해야할까요?',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/police/story01/002.png', 'QUIZ',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/police/story01/02.mp3', 5),
       (25, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', '앞으로도 경찰에 신고할 때는 112로 전화해요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/police/story01/003.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/police/story01/03.mp3', 5),
       (26, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '[길을 잃었어요] 이야기 완료!
기념 사진을 찍어보아요!',
        '', 'CLEAR', 'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/police/story01/04.mp3', 5);

insert into rabbit.quiz_data (id, created_time, updated_time, correct_answer, quiz_type, scene_data_id)
values (8, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', '112', 'EMERGENCY', 24);


-- 마트
insert into rabbit.story_data (id, created_time, updated_time, recommend_age, story_image_url, title, place_data_id)
values (6, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', '3~4세',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/mart/story01/000.png', '새 옷을 사요', 4);

INSERT INTO rabbit.scene_data (id, created_time, updated_time, content, scene_image_url, scene_type, voice_url,
                               story_data_id)
VALUES (27, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', '토비가 키가 커서 새 바지가 필요해요.
바지를 그려주세요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/mart/story01/001.png', 'QUIZ',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/mart/story01/01.mp3', 6),
       (28, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000',
        '참 잘했어요.
옷이 작아지면 새 옷을 입어요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/mart/story01/002.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/mart/story01/02.mp3', 6),
       (29, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '[새 옷을 사요] 이야기 완료!
기념 사진을 찍어보아요!',
        '', 'CLEAR', 'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/mart/story01/03.mp3', 6);

insert into rabbit.quiz_data (id, created_time, updated_time, correct_answer, quiz_type, scene_data_id)
values (9, '2024-04-02 15:45:00.000000', '2024-04-02 15:45:00.000000', 'pants', 'DRAWINGS', 26);