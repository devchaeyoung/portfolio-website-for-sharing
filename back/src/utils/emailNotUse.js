/** @description  */
module.exports = {
	/** @return boolean */
	/** @description 인자로 받은 메일이 DB와 매치되지 않으면 로직이 중단됩니다. */
	emailNotUse: (user) => {
		if (!user) {
			const errorMessage = `해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.`;
			throw new Error(errorMessage);
		}
	},
};
