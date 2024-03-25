package garden.carrot.toby.common.s3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.common.s3.dto.S3Dto;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class S3Service {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;

	// 파일 업로드
	@Transactional
	public S3Dto uploadFile(MultipartFile multipartFile) {
		// 파일 업로드시, 파일명을 난수화하기 위해 UUID 를 활용하여 난수 생성
		String fileKey = UUID.randomUUID().toString();

		// AWS S3에 업로드할 객체의 메타데이터를 설정 -> 파일을 로컬에 따로 저장하지 않고 바로 S3에 저장하기 위함
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(multipartFile.getSize());
		objectMetadata.setContentType(multipartFile.getContentType());

		// AWS S3에 파일 업로드 하는 부분.
		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3.putObject(new PutObjectRequest(bucket, fileKey, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new CustomException(ErrorCode.FILE_UPLOAD_FAIL);
		}

		return new S3Dto(fileKey, amazonS3.getUrl(bucket, fileKey).toString());
	}

}
