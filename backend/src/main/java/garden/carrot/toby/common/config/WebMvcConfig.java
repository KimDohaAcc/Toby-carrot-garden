package garden.carrot.toby.common.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.Getter;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	private final String host;

	private final String[] protocols = {"http://", "https://"};
	private final String localhost = "localhost:";

	private final String[] allowedHosts = new String[] {
		localhost,
		"127.0.0.1:"
	};
	private final int defaultPort = 80;
	private final int allowedMinPort = 5173;
	private final int allowedMaxPort = 5175;

	@Getter
	private static List<String> allowedOrigins = new ArrayList<>();

	public WebMvcConfig(@Value("${DOMAIN}") String host) {
		this.host = host;

		// 허용할 origin 목록
		for (String protocol : protocols) {
			allowedOrigins.add(protocol + host);
			allowedOrigins.add(protocol + localhost + defaultPort);

			int allowedPort = allowedMinPort;

			while (allowedPort <= allowedMaxPort) {
				for (String h : allowedHosts) {
					allowedOrigins.add(protocol + h + allowedPort);
				}
				allowedPort += 1;
			}
		}
	}

	// CORS
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins(allowedOrigins.toArray(new String[allowedOrigins.size()]))
			.allowedMethods(
				HttpMethod.OPTIONS.name(),
				HttpMethod.GET.name(),
				HttpMethod.HEAD.name(),
				HttpMethod.POST.name(),
				HttpMethod.PUT.name(),
				HttpMethod.PATCH.name(),
				HttpMethod.DELETE.name())
			.allowedHeaders("*")
			.exposedHeaders("*")
			.maxAge(3000); // pre-flight 리퀘스트를 캐싱
	}
}
