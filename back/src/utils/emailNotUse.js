module.exports = {
	emailNotUse: (user) => {
		if (!user) {
			throw new Error(`해당 이메일은 가입 내역이 없습니다.`);
		}
	},
};
