package garden.carrot.toby.api.story.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import garden.carrot.toby.common.exception.ExceptionUtil;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;
	private final ExceptionUtil exceptionUtil;

	public void sendMessage(ProducerData data, String topicName) throws JsonProcessingException {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonDto = objectMapper.writeValueAsString(data);

			kafkaTemplate.send(topicName, jsonDto);
		}catch (Exception e){
			exceptionUtil.sendExceptionToDiscord(e);
			throw e;
		}
	}
}