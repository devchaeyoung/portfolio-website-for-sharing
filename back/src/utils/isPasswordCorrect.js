const bcrypt = require("bcrypt");
module.exports = {
	/** @return boolean */
	/** @description 원시데이터와 해시를 비교합니다. 불일치시 로직을 중단합니다. */
	isPasswordCorrect: async (password, correctPasswordHash) => {
		const result = await bcrypt.compare(password, correctPasswordHash);
		if (!result) {
			const errorMessage =
				"비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.";
			throw new Error(errorMessage);
		}
	},
};
