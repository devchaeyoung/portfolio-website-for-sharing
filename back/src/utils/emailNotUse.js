module.exports = {
	emailNotUse: (user) => {
		if (!user) {
			const errorMessage = `해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.`;
			throw new Error(errorMessage);
		}
	},
};
