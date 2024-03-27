package garden.carrot.toby.common.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import garden.carrot.toby.api.auth.jwt.JwtFilter;
import garden.carrot.toby.api.auth.jwt.TokenProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final TokenProvider tokenProvider;

	private final String FRONT_DOMAIN;

	public SecurityConfig(@Value("${DOMAIN.FRONT}") String frontDomain,
		TokenProvider tokenProvider) {

		this.FRONT_DOMAIN = frontDomain;
		this.tokenProvider = tokenProvider;
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
			.csrf(AbstractHttpConfigurer::disable) //csrf 비활성
			.httpBasic(AbstractHttpConfigurer::disable) //HTTP 기본인증 비활성
			// 시큐리티가 세션을 만들지도 사용하지도 않음.
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			.addFilterAfter(new JwtFilter(tokenProvider),
				UsernamePasswordAuthenticationFilter.class)
		;

		return http.build();
	}

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final String LOCALHOST = "localhost:";

		final String[] ALLOWED_HOSTS = new String[] {
			LOCALHOST,
			"127.0.0.1:"
		};

		final String[] PROTOCOLS = {"http://", "https://"};

		final int DEFAULT_PORT = 80;
		final int ALLOWED_MIN_PORT = 5173;
		final int ALLOWED_MAX_PORT = 5175;

		// 허용할 origin 목록
		List<String> allowedOrigins = new ArrayList<>();
		allowedOrigins.add(FRONT_DOMAIN);

		for (String protocol : PROTOCOLS) {

			allowedOrigins.add(protocol + LOCALHOST + DEFAULT_PORT);

			int allowedPort = ALLOWED_MIN_PORT;

			while (allowedPort <= ALLOWED_MAX_PORT) {
				for (String host : ALLOWED_HOSTS) {
					allowedOrigins.add(protocol + host + allowedPort);
				}
				allowedPort += 1;
			}
		}
		
		CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(allowedOrigins);
		corsConfiguration.setAllowedMethods(List.of(
			HttpMethod.GET.name(),
			HttpMethod.POST.name(),
			HttpMethod.PUT.name(),
			HttpMethod.PATCH.name(),
			HttpMethod.DELETE.name(),
			HttpMethod.OPTIONS.name()
		));

		corsConfiguration.setAllowedHeaders(List.of(
			HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS,
			HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN,
			HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS,
			HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS,
			HttpHeaders.CONTENT_TYPE,
			HttpHeaders.AUTHORIZATION
		));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}
}

