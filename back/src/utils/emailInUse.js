module.exports = {
	emailInUse: (user) => {
		if (user) {
			throw new Error("이미 사용중인 이메일입니다.");
		}
	},
};
