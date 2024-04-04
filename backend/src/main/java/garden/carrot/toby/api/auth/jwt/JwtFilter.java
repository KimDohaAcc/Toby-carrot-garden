package garden.carrot.toby.api.auth.jwt;

import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private static final String AUTHORIZATION_HEADER = "Authorization";
	private final TokenProvider tokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		// 1. 토큰이 필요하지 않은 API URL에 대해서 배열로 구성한다.
		List<String> list = Arrays.asList(
			"/api/swagger-ui/swagger-initializer.js",
			"/api/swagger-ui/index.html",              // localhost swagger
			"/v3/api-docs",
			"/api/v3/api-docs",
			"/api/v3/api-docs/swagger-config",
			"/api/auth/token"
		);

		// 2. 토큰이 필요하지 않은 API URL의 경우 -> 로직 처리없이 다음 필터로 이동한다.
		if (list.contains(request.getRequestURI()) || request.getRequestURI().contains("swagger")) {
			filterChain.doFilter(request, response);
			return;
		}
		// 3.토큰이 필요하지 않은 API URL의 경우 -> /api/auth/ 로 시작하는 URL인 경우 다음 필터로 이동한다.
		if (request.getRequestURI().startsWith("/api/auth/oauth2") || request.getRequestURI()
			.startsWith("/api/hello/")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = resolveToken(request);
		if (token == null) {
			throw new CustomException(ErrorCode.NO_TOKEN);
		}

		boolean isValidate = false;
		boolean isRefresh = false;
		try {
			isValidate = tokenProvider.validateToken(token);
		} catch (CustomException e) {
			if (!request.getRequestURI().equals("/api/auth/refresh")) {
				throw e;
			} else {
				isRefresh = true;
			}
		}

		if ((StringUtils.hasText(token) && isValidate) || isRefresh) {
			//토큰 값에서 Authentication 값으로 가공해서 반환 후 저장
			Authentication authentication;
			authentication = tokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		//다음 필터로 넘기기
		filterChain.doFilter(request, response);
	}

	/**
	 * HttpServletRequest에서 `Authorization` 헤더를 받음. 헤더에서 'Bearer'로 시작하는 토큰이 있으면 'Bearer' 부분 제거하고 토큰
	 * 값 반환 아니면 널 값 반환
	 *
	 * @param request
	 * @return
	 */
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}

		return null;
	}
}


