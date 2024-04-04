package garden.carrot.toby.api.auth.jwt;

import garden.carrot.toby.api.auth.dto.AuthDto;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TokenProvider {

	private static final String AUTHORITIES_KEY = "Authentication";
	private static final String BEARER_TYPE = "Bearer ";
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000L * 60 * 60 * 24 * 100;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000L * 60 * 60 * 24 * 7;
	private final Key key;

	public TokenProvider(@Value("${secretKeyPlain}") String secretKey) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public AuthDto.SigninResponse generateTokenResponse(Authentication auth) {
		long now = new Date().getTime();

		String accessToken = Jwts.builder()
			.setSubject(auth.getName())
			.setExpiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
			.signWith(key, SignatureAlgorithm.HS512)
			.compact();

		String refreshToken = Jwts.builder()
			.setSubject(auth.getName())
			.setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
			.signWith(key, SignatureAlgorithm.HS512)
			.compact();

		return AuthDto.SigninResponse.builder()
			.memberId(auth.getName())
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

	public Authentication getAuthentication(String accessToken) {
		// Access Token 유효성 확인 및 파싱
		Claims claims = paresClaims(accessToken);

		UserDetails principal = new User(claims.getSubject(), "", new ArrayList<>());

		return new UsernamePasswordAuthenticationToken(principal, "");
	}

	public Authentication getPlainAuthentication(String accessToken) {
		// Access Token 유효성 확인 및 파싱
		String plainTextClaims = paresPlainTextClaims(accessToken);

		UserDetails principal = new User(plainTextClaims, "", new ArrayList<>());

		return new UsernamePasswordAuthenticationToken(principal, "");
	}

	public boolean validateToken(String token) {
		try {
			// Refresh Token의 경우 파싱되기만 하면 OK
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (SecurityException e) {
			handleSecurityException(e);
		} catch (MalformedJwtException e) {
			handleMalformedJwtException(e);
		} catch (ExpiredJwtException e) {
			handleExpiredJwtException(e);
		} catch (UnsupportedJwtException e) {
			handleUnsupportedJwtException(e);
		} catch (IllegalArgumentException e) {
			handleIllegalArgumentException(e);
		}

		return false;
	}

	private Claims paresClaims(String accessToken) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken)
				.getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}

	private String paresPlainTextClaims(String accessToken) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parsePlaintextJws(accessToken)
				.getBody();
		} catch (ExpiredJwtException e) {
			return e.getMessage();
		}
	}

	private void handleSecurityException(SecurityException e) {
		throw new CustomException(ErrorCode.INVALID_SIGNATURE_TOKEN);
	}

	private void handleMalformedJwtException(MalformedJwtException e) {
		throw new CustomException(ErrorCode.MALFORMED_TOKEN);
	}

	private void handleExpiredJwtException(ExpiredJwtException e) {
		throw new CustomException(ErrorCode.EXPIRED_TOKEN);
	}

	private void handleUnsupportedJwtException(UnsupportedJwtException e) {
		throw new CustomException(ErrorCode.UNSUPPORTED_JWT);
	}

	private void handleIllegalArgumentException(IllegalArgumentException e) {
		throw new CustomException(ErrorCode.BAD_PARAMETER);
	}
}

