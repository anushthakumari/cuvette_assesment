const config = require("../config");

const accountSid = config.ACCOUNT_SID;
const authToken = config.TWILLIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendOTP = async (number, otp) => {
	const verification_check = await client.verify.v2
		.services(config.SERVICE_ID)
		.verificationChecks.create({
			to: `+91${number}`,
			code: otp,
			channel: "sms",
		});

	console.log(verification_check.status);
};

module.exports = {
	sendOTP,
};
