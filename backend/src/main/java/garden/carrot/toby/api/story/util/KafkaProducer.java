package garden.carrot.toby.api.story.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	public void sendMessage(ProducerData data, String topicName) {
		try {
			System.out.println("이거 됨?" + data + topicName);
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonDto = objectMapper.writeValueAsString(data);

			kafkaTemplate.send(topicName, jsonDto);
		} catch (Exception e) {
			e.printStackTrace();
		}


	}
}