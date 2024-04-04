-- 학교 퀴즈
UPDATE rabbit.scene_data
SET content = '친구인 코코가 교실에 들어오네요. 교실에 들어오려면 무엇을 열어야할까요? 교실 문을 그려보세요.'
WHERE id = 6;

UPDATE rabbit.scene_data
SET content = '참 잘했어요. 친구랑 반갑게 인사해보아요.'
WHERE id = 7;

UPDATE rabbit.quiz_data
SET correct_answer = 'door'
WHERE id = 3;

-- 학교 내용
UPDATE rabbit.scene_data
SET content = '좋아요~ 이렇게 예쁜 미소로 인사하면 선생님께서도 좋아하실 거예요!'
WHERE id = 5;

-- 병원 퀴즈
UPDATE rabbit.scene_data
SET content = '오늘은 병원에 가는 날이에요.'
WHERE id = 9;

UPDATE rabbit.scene_data
SET content = '병원에 가기전에 옷을 입어야해요. 티셔츠를 그려볼까요?'
WHERE id = 10;

UPDATE rabbit.scene_data
SET content = '참 잘했어요. 앞으로도 스스로 옷을 입어보아요.'
WHERE id = 11;

UPDATE rabbit.quiz_data
SET correct_answer = 't-shirt'
WHERE id = 4;

-- 병원 내용
UPDATE rabbit.scene_data
SET content = '토비가 의사선생님께 질문했어요. "어른이 없을 때 누가 다치거나 아프면 어떡해요?"'
WHERE id = 12;

UPDATE rabbit.scene_data
SET content = '"그럴 땐 119에 전화를 하렴." 의사선생님께서 말씀하셨어요.'
WHERE id = 13;
