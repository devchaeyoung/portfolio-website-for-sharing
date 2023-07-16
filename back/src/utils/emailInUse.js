module.exports = {
	/** @return boolean */
	/** @description 인자로 받은 메일이 DB와 매치되면 로직이 중단됩니다.  */
	emailInUse: (user) => {
		if (user) {
			const errorMessage = `이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.`;
			throw new Error(errorMessage);
		}
	},
};
