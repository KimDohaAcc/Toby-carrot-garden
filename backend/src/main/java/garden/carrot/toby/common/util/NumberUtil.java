package garden.carrot.toby.common.util;

public class NumberUtil {
	/**
	 * 소수점 아래 n번쨰 자리까지 보여주는 메서드
	 * @param number 대상 실수
	 * @param n 소수점 아래 n번째 자리
	 * @return 소수점 아래 n + 1 번쨰 자리에서 반올림된 실수
	 */
	public static double round(double number, int n) {
		double powerOfTen = Math.pow(10, n);
		return Math.round(number * powerOfTen) / powerOfTen;
	}
}
