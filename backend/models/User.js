const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	employeeSize: {
		type: Number,
		required: true,
	},

	isVerified: {
		type: Boolean,
		default: false,
	},

	emailOtp: {
		type: Number,
	},

	phoneOtp: {
		type: Number,
	},

	isEmailVerified: {
		type: Boolean,
		default: false,
	},

	isPhoneVerified: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("User", UserSchema);
