package garden.carrot.toby.common.s3.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class S3Dto {

	String fileKey;
	String fileUrl;
}
