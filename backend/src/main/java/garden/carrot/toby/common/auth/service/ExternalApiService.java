package garden.carrot.toby.common.auth.service;

import java.net.URI;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExternalApiService {
	private final ObjectMapper objectMapper;

	public <T> T sendPostRequest(URI uri, Object requestDto, Class<T> responseType) {
		// 요청 설정
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		MultiValueMap<String, String> requestBody = convertDtoToMultiValueMap(requestDto);
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

		// 요청 보내기
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> responseEntity = restTemplate.postForEntity(uri, requestEntity, Map.class);

		// 받은 응답 데이터 Camel Case로 변환하기
		ObjectMapper mapper = new ObjectMapper();
		mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

		return mapper.convertValue(responseEntity.getBody(), responseType);
	}

	public MultiValueMap<String, String> convertDtoToMultiValueMap(Object dto) {
		MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();

		try {
			// DTO 객체를 Map으로 변환
			Map<String, Object> dtoMap = objectMapper.convertValue(dto, Map.class);

			// Map의 키와 값을 MultiValueMap에 추가 (Snake Case로 변환)
			for (Map.Entry<String, Object> entry : dtoMap.entrySet()) {
				String snakeCaseKey = camelToSnakeCase(entry.getKey());
				multiValueMap.add(snakeCaseKey, entry.getValue().toString());
			}
		} catch (Exception e) {
			// 예외 처리
			e.printStackTrace();
		}

		return multiValueMap;
	}

	private String camelToSnakeCase(String camelCase) {
		return camelCase.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
	}
}
