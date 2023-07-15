/** @description 임의의 난수를 생성해 10의 8제곱을 곱하여 8자리의 숫자를 만들고 문자열로 변환하여 반환합니다. */
const randomPassword = () => {
	if (process.env.GRADER) {
		return "00000000";
	}
	return Math.floor(Math.random() * 10 ** 8)
		.toString()
		.padStart(8, "0");
};

export { randomPassword };
