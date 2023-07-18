module.exports = {
	emailNotUse: (user) => {
		if (!user) {
			const errorMessage = `해당 이메일은 가입 내역이 없습니다.`;
			throw new Error(errorMessage);
		}
	},
};
