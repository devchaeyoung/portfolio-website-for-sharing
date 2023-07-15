module.exports = {
	emailInUse: (user) => {
		if (user) {
			const errorMessage = `이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.`;
			throw new Error(errorMessage);
		}
	},
};
