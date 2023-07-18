module.exports = {
	emailInUse: (user) => {
		if (user) {
			const errorMessage = `사용중인 이메일 입니다.`;
			throw new Error(`${errorMessage} : ${user.email}`);
		}
	},
};
