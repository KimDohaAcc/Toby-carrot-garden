package garden.carrot.toby.hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/hello")
	public String hello() throws Exception {
		String returnData = "Hello World!";
		throw new Exception("exception입니당");
		// return returnData;
	}
}
