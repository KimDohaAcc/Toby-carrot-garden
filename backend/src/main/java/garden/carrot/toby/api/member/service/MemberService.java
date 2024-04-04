package garden.carrot.toby.api.member.service;

import garden.carrot.toby.api.member.dto.ClearImageDto.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.api.member.constatns.CarrotEnum;
import garden.carrot.toby.api.member.dto.CarrotDto;
import garden.carrot.toby.api.member.dto.ClearImageDto;
import garden.carrot.toby.api.member.mapper.ClearImageMapper;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.dto.ListDto;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.domain.carrotgradedata.entity.CarrotGradeData;
import garden.carrot.toby.domain.carrotgradedata.repository.CarrotGradeDataRepository;
import garden.carrot.toby.domain.clearimage.repository.ClearImageRepository;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.membercarrot.entity.MemberCarrot;
import garden.carrot.toby.domain.membercarrot.repoository.MemberCarrotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberService {
	private final MemberCarrotRepository memberCarrotRepository;
	private final CarrotGradeDataRepository carrotGradeDataRepository;
	private final ClearImageRepository clearImageRepository;
	private final ClearImageMapper clearImageMapper;
	private final MemberUtil memberUtil;

	private static final Map<Integer, Integer> placeIdToCarrotGradeMap = new HashMap<>();
	private final int placeCount = CarrotEnum.values().length;

	// 클래스가 로드될 때 한 번만 실행되는 코드 블록
	static {
		for (CarrotEnum carrotEnum : CarrotEnum.values()) {
			placeIdToCarrotGradeMap.put(carrotEnum.getPlaceId(), carrotEnum.getMasterCarrotGrade());
		}
	}

	public ListDto<CarrotDto.Response> getCarrots() {
		// 고민: DB에 있는 값을 하드코딩하지 않을 방법이 있을까?
		final int MASTER_GRADE = 5; // 마스터 등급의 id
		final int DEFAULT_CARROT_GRADE = 1; // 씨앗 등급 id
		final int DEFAULT_CARROT_COUNT = 0; // 문제를 안 풀었을 때의 당근 개수
		final int DEFAULT_GRADE_MAX = 10; // 씨앗등급에서 다음 등급으로 업그레이드하기 위해 필요한 당근 개수

		Member member = memberUtil.getLoginMember();
		List<CarrotDto.Response> list = new ArrayList<>();

		// outer join 하면 좋을 것 같긴 한데 잘 모르겠으니까 그냥 JPA로 하자
		List<MemberCarrot> carrots = memberCarrotRepository.findAllByMemberIdOrderByPlaceData_Id(member.getId());

		int carrotIndex = 0;
		MemberCarrot carrot = null;

		for (int i = 0; i < placeCount; i++) {
			int placeId = i + 1;
			if (carrotIndex < carrots.size()) {
				carrot = carrots.get(carrotIndex);
			}

			// 해당하는 당근이 있는 경우
			if (carrot != null && placeId == carrot.getPlaceData().getId()) {

				// Variable used in lambda expression should be final or effectively final
				int carrotCount = carrot.getCount();

				CarrotGradeData grade = carrotGradeDataRepository.findCarrotGradeIdByCount(carrot.getCount())
					.orElseThrow(() -> new CustomException(
						ErrorCode.INVALID_CARROT_COUNT, carrotCount));

				// 특화 당근 등급 설정 (api 명세서에 설명 있음)
				int carrotGrade =
					grade.getId() == MASTER_GRADE ? placeIdToCarrotGradeMap.get(carrot.getPlaceData().getId()) :
						grade.getId();

				list.add(CarrotDto.Response.builder()
					.carrotGrade(carrotGrade)
					.carrotCount(carrot.getCount())
					.placeId(carrot.getPlaceData().getId())
					// 다음 등급이 되기 위해 필요한 당근 개수 : 현재등급의 max 값 + 1
					.gradeMax(grade.getMax() == Integer.MAX_VALUE ? grade.getMax() : grade.getMax() + 1)
					.build());

				carrotIndex++;
				continue;
			}

			// 디폴트 값 (해당 place를 플레이한 적이 없는 경우)
			list.add(CarrotDto.Response.builder()
				.carrotGrade(DEFAULT_CARROT_GRADE)
				.carrotCount(DEFAULT_CARROT_COUNT)
				.placeId(placeId)
				// 다음 등급이 되기 위해 필요한 당근 개수 : 현재등급의 max 값 + 1
				.gradeMax(DEFAULT_GRADE_MAX)
				.build());

		}

		ListDto<CarrotDto.Response> response = new ListDto<>(list);
		return response;
	}

	public ListDto<ClearImageDto.Response> getClearImages() {
		Member member = memberUtil.getLoginMember();
		List<ClearImageDto.Response> list = clearImageRepository.findAllByMemberIdOrderByCreatedTimeDesc(member.getId())
			.stream().map(i -> clearImageMapper.clearImageToClearImageDtoResponse(i)).toList();

		ListDto<ClearImageDto.Response> response = new ListDto<>(list);
		System.out.println(response);
		return response;
	}
}
