package garden.carrot.toby.api.story.util;

import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(ProducerData data, String topicName) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonDto = objectMapper.writeValueAsString(data);

            kafkaTemplate.send(topicName, jsonDto);
        }catch (Exception e){
            e.printStackTrace();
        }


    }
}