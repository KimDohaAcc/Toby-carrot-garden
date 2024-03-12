package garden.carrot.toby.common.configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {
	private final AuthenticationConfiguration authenticationConfiguration;
	// private final TokenProvider tokenProvider;
	// private final CorsConfig config;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.cors(CorsConfigurer::disable) // WebMvcConfig에 있는 cors 설정 사용
			.cors(Customizer.withDefaults())
			.csrf(AbstractHttpConfigurer::disable) //csrf 비활성
			.httpBasic(AbstractHttpConfigurer::disable) //HTTP 기본인증 비활성
			// 시큐리티가 세션을 만들지도 사용하지도 않음.
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
		// .addFilterAfter(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
		;
		return http.build();
	}

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(WebMvcConfiguration.getAllowedOrigins());
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
			HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS
		));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}
}

