const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "kumarsen.bash@gmail.com",
		pass: process.env.PASS,
	},
});

const sendEmail = async (recipients, subject, text, html = "") => {
	try {
		const to = Array.isArray(recipients) ? recipients.join(", ") : recipients;

		const info = await transporter.sendMail({
			from: "no-reply@interviewapp.com",
			to,
			subject,
			text,
			html,
		});
		console.log("Email sent:", info.response);
	} catch (error) {
		console.error("Error sending email:", error);
	}
};

module.exports = {
	sendEmail,
};
