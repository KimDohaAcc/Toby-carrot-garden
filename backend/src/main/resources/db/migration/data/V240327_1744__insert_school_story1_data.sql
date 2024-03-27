insert into rabbit.story_data (id, created_time, updated_time, recommend_age, story_image_url, title, place_data_id)
values (1, '2024-03-27 18:26:12.000000', '2024-03-27 18:26:14.000000', '3~4세',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/004.png', '등교하는 토비', 1),
       (2, '2024-03-27 18:26:14.000000', '2024-03-27 18:26:15.000000', '3~4세',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/hospital/story01/001.png', '병원아 지켜줘!',
        2);

INSERT INTO rabbit.scene_data (id, created_time, updated_time, content, scene_image_url, scene_type, voice_url,
                               story_data_id)
VALUES (1, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '기분 좋은 햇살이 들어오는 아침이에요. 토비는 눈을 뜨고 기지개를 켰어요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/001.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/01.mp3', 1),
       (2, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000',
        '맛있게 아침을 먹고 필요한 준비물을 모두 챙겼어요. 준비물은 어디에 담아가야 할지 가져와 보세요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/002.png', 'QUIZ',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/02.mp3', 1),
       (3, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '참 잘했어요! 이제 가방을 메고 학교에 가요.',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/003.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/03.mp3', 1),
       (4, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000',
        '학교에 도착했어요. 선생님께서 반갑게 맞아주셨어요. 선생님께 인사를 드리고 미소를 지어볼까요?',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/004.png', 'QUIZ',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/04.mp3', 1),
       (5, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '좋아요~ 이렇게 예쁜 미소로 인사하면 선생님도 좋아하실 거예요!',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/005.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/05.mp3', 1),
       (6, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000',
        '친구가 교실에 들어오고 있어요! 길쭉한 코가 앞에 보이네요. 길쭉한 코를 가진 친구는 어떤 동물일지 그려볼까요?',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/006.png', 'QUIZ',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/06.mp3', 1),
       (7, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '참 잘했어요. 길쭉한 코를 가진 친구는 코끼리 친구 코코였어요!',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/school/story01/007.png', 'NORMAL',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/07.mp3', 1),
       (8, '2024-03-27 17:36:11.000000', '2024-03-27 17:36:12.000000', '[등교하는 토비] 이야기 완료! 기념 사진을 찍어보아요!', '', 'CLEAR',
        'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/voice/school/story01/08.mp3', 1);

insert into rabbit.quiz_data (id, created_time, updated_time, correct_answer, quiz_type, scene_data_id)
values (1, '2024-03-27 17:46:56.000000', '2024-03-27 17:46:57.000000', 'bag', 'OBJECTS', 2),
       (2, '2024-03-27 17:47:54.000000', '2024-03-27 17:47:53.000000', 'Happy', 'FEELINGS', 4),
       (3, '2024-03-27 17:49:24.000000', '2024-03-27 17:49:23.000000', 'elephant', 'DRAWINGS', 6);