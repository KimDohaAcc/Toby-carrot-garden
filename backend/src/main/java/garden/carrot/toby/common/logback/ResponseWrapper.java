package garden.carrot.toby.common.logback;

import org.springframework.web.util.ContentCachingResponseWrapper;

import jakarta.servlet.http.HttpServletResponse;

public class ResponseWrapper extends ContentCachingResponseWrapper {
	public ResponseWrapper(HttpServletResponse response) {
		super(response);
	}
}
