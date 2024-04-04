package garden.carrot.toby.hello.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class HelloDto {

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Request {

		private String hello;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {

		private String world;
	}
}
