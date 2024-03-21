package garden.carrot.toby.common.exception.logback;
-=
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.seas.common.dto.ApiResponse;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoggingFilter extends OncePerRequestFilter {
    protected static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);
    private final DiscordNotifier discordNotifier;
    private StringBuilder stringBuilder = new StringBuilder();
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        stringBuilder.setLength(0);

        stringBuilder.append("time: ").append(LocalDateTime.now()).append("\n");
        MDC.put("traceId", UUID.randomUUID().toString());
        try {
            if (isAsyncDispatch(request)) {
                filterChain.doFilter(request, response);
            } else {
                doFilterWrapped(new RequestWrapper(request), new ResponseWrapper(response), filterChain);
            }
        } catch (Exception ex) {
            handleException(ex, response);
        } finally {
            discordNotifier.notify(stringBuilder.append("========================").toString());
            MDC.clear();
        }
    }

    protected void doFilterWrapped(RequestWrapper request, ContentCachingResponseWrapper response,
                                   FilterChain filterChain) throws ServletException, IOException {
        try {
            logRequest(request);
            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            handleException(ex, response);
            throw ex; // Re-throw the exception to propagate it to the outer catch block
        } finally {
            logResponse(response);
            response.copyBodyToResponse();
        }
    }

    private void logRequest(RequestWrapper request) throws IOException {
        String queryString = request.getQueryString();
        log.info("Request : {} uri=[{}] content-type=[{}]", request.getMethod(),
                queryString == null ? request.getRequestURI() : request.getRequestURI() + queryString,
                request.getContentType());
        String logMessage = String.format("Request : %s uri=[%s] content-type=[%s]", request.getMethod(),
                queryString == null ? request.getRequestURI() : request.getRequestURI() + queryString,
                request.getContentType());
        stringBuilder.append("Origin: ").append(request.getHeader("Origin")).append("\n");
        stringBuilder.append(logMessage).append("\n");

        logPayload("Request", request.getContentType(), request.getInputStream());
    }

    private void logResponse(ContentCachingResponseWrapper response) throws IOException {
        String logMessage = String.format("Response : %s", response.getStatus());
        stringBuilder.append(logMessage).append("\n");
        logPayload("Response", response.getContentType(), response.getContentInputStream());
    }

    private void logPayload(String prefix, String contentType, InputStream inputStream) throws IOException {
        boolean visible = isVisible(MediaType.valueOf(contentType == null ? "application/json" : contentType));
        if (visible) {
            byte[] content = StreamUtils.copyToByteArray(inputStream);
            if (content.length > 0) {
                String contentString = new String(content);
                log.info("{} Payload: {}", prefix, contentString);
                stringBuilder.append(prefix).append(" Payload:").append(contentString).append("\n");

            }
        } else {
            log.info("{} Payload: Binary Content", prefix);
            stringBuilder.append(prefix).append(" Payload: Binary Content").append("\n");
        }
    }

    private boolean isVisible(MediaType mediaType) {
        final List<MediaType> VISIBLE_TYPES = Arrays.asList(MediaType.valueOf("text/*"),
                MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML,
                MediaType.valueOf("application/*+json"), MediaType.valueOf("application/*+xml"),
                MediaType.MULTIPART_FORM_DATA);
        return VISIBLE_TYPES.stream().anyMatch(visibleType -> visibleType.includes(mediaType));
    }

    private void handleException(Exception ex, HttpServletResponse response) throws IOException {
        log.error("Exception during request processing", ex);
        ex.printStackTrace();
        String logMessage = String.format("[ERROR] : %s", ex.getMessage()+"\n\n"+ex.getStackTrace());
        stringBuilder.append(logMessage).append("\n");
        ApiResponse<?> errorResponse = ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage());
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        // Customize the response based on the exception
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write(jsonResponse);
    }
}