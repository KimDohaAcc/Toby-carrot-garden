package garden.carrot.toby.api.auth.constatnts;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KakaoConstants {

	@Getter
	private static String clientId;

	@Getter
	private static String redirectUri;

	@Value("${KAKAO.CLIENT_ID}")
	private String clientIdValue;
	@Value("${KAKAO.REDIRECT_URI}")
	private String redirectUriValue;

	@PostConstruct
	// 스프링 빈이 초기화될 때 호출
	public void init() {
		clientId = clientIdValue;
		redirectUri = redirectUriValue;
	}

	private KakaoConstants() {
	}
}
