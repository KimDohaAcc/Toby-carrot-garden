package garden.carrot.toby.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(servers = {
	@Server(url = "/api", description = "Server URL")
})
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.version("v1.0.0")
			.title("Toby API")
			.description("JWT 토큰은 우측 Authorize 버튼 누르고 Bearer 문자열 없이 **토큰만** 넣어주세요");

		// SecuritySecheme명
		String jwtSchemeName = "JWT";
		// API 요청헤더에 인증정보 포함
		SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);
		// SecuritySchemes 등록
		Components components = new Components()
			.addSecuritySchemes(jwtSchemeName, new SecurityScheme()
				.name(jwtSchemeName)
				.type(SecurityScheme.Type.HTTP) // HTTP 방식
				.scheme("bearer")
				.bearerFormat("JWT")); // 토큰 형식을 지정하는 임의의 문자(Optional)

		return new OpenAPI()
			.info(info)
			.addSecurityItem(securityRequirement)
			.components(components);
	}
}

