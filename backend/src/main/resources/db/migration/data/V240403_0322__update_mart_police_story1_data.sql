-- 경찰서, 마트 place id 수정
UPDATE rabbit.story_data SET created_time = '2024-04-02 15:45:00.000000', updated_time = '2024-04-03 03:30:00.000000', recommend_age = '3~4세', story_image_url = 'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/police/story01/000.png', title = '길을 잃었어요', place_data_id = 4 WHERE id = 5;
UPDATE rabbit.story_data SET created_time = '2024-04-02 15:45:00.000000', updated_time = '2024-04-03 03:30:00.000000', recommend_age = '3~4세', story_image_url = 'https://tobycarrotbucket.s3.ap-northeast-2.amazonaws.com/assets/image/mart/story01/000.png', title = '새 옷을 사요', place_data_id = 3 WHERE id = 6;

-- 씬 id 수정
UPDATE rabbit.quiz_data SET created_time = '2024-04-02 15:45:00.000000', updated_time = '2024-04-03 03:30:00.000000', correct_answer = 'pants', quiz_type = 'DRAWINGS', scene_data_id = 27 WHERE id = 9;

