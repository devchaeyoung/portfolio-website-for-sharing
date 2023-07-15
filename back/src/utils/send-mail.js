const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "daechan476@gmail.com",
		pass: "adabvpsjxsnvfedh",
		//앱 비밀번호임
	},
});

/** @description to, subject, text 를 인자로 받아 메일을 전송합니다 */
const sendMail = (to, subject, text) =>
	new Promise((resolve, reject) => {
		const message = {
			to,
			subject,
			text,
		};
		transport.sendMail(message, (err, info) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(info);
		});
	});

export { sendMail };
