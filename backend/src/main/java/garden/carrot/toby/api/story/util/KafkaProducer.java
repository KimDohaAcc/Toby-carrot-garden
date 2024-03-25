package garden.carrot.toby.api.story.util;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.common.exception.ExceptionUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KafkaProducer {

	private KafkaTemplate<String, String> kafkaTemplate;
	private ExceptionUtil exceptionUtil;

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