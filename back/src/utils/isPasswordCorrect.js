const bcrypt = require("bcrypt");
module.exports = {
	isPasswordCorrect: async (password, correctPasswordHash) => {
		const result = await bcrypt.compare(password, correctPasswordHash);
		if (!result) {
			throw new Error("비밀번호가 일치하지 않습니다");
		}
	},
};
