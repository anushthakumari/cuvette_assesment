const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const utils = require("../helpers/utils");
const mailer = require("../helpers/mailer");

router.post(
	"/register",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("phone", "Phone number is required").not().isEmpty(),
		check("companyName", "Company name is required").not().isEmpty(),
		check(
			"employeeSize",
			"Employee size is required and must be a number"
		).isNumeric(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { name, email, phone, companyName, employeeSize } = req.body;

		name = name.trim();
		email = email.trim();
		phone = phone.trim();
		companyName = companyName.trim();

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Email already exists" }] });
			}

			user = await User.findOne({ phone });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Phone number already exists" }] });
			}

			const emailOtp = utils.generateOTP();
			const phoneOtp = emailOtp;

			await mailer.sendEmail(
				[email],
				"Please verify your accout!",
				"Hi,\n Please find the otp below \n \t OTP: " + emailOtp
			);

			user = new User({
				name,
				email,
				phone,
				companyName,
				employeeSize,
				isVerified: false,
				emailOtp: parseInt(emailOtp),
				phoneOtp: parseInt(phoneOtp),
			});

			await user.save();

			const payload = {
				id: user.id,
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: "30d" },
				(err, token) => {
					if (err) throw err;
					res.json({
						user: {
							name: user.name,
							token,
						},
					});
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ message: "Something went wrong!" });
		}
	}
);

router.post("/verify-email", authMiddleware, async (req, res) => {
	const { otp } = req.body;

	try {
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(400).json({ errors: [{ msg: "User not found" }] });
		}

		if (user.emailOtp !== parseInt(otp)) {
			return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
		}

		user.isEmailVerified = true;
		user.isVerified =
			user.isPhoneVerified && user.isEmailVerified ? true : false;
		user.emailOtp = null;
		await user.save();

		res.json({ msg: "Email verified successfully!" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ message: "Something went wrong!" });
	}
});

router.post("/request-email-otp", async (req, res) => {
	const { email } = req.body;

	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ errors: [{ msg: "User not found" }] });
		}

		const emailOtp = utils.generateOTP();

		await mailer.sendEmail(
			[email],
			"Please verify your accout!",
			"Hi,\n Please find the otp below \n \t OTP: " + emailOtp
		);

		user.emailOtp = emailOtp;

		await user.save();

		res.json({ msg: "otp sent" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ message: "Something went wrong!" });
	}
});

router.post("/verify-email-login", async (req, res) => {
	const { otp, email } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ errors: [{ msg: "User not found" }] });
		}

		if (user.emailOtp !== parseInt(otp)) {
			return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
		}

		user.emailOtp = null;

		await user.save();

		const payload = {
			id: user.id,
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: "30d" },
			(err, token) => {
				if (err) throw err;
				res.json({
					user: {
						name: user.name,
						token,
					},
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ errors: [{ msg: "Something went wrong!" }] });
	}
});

router.post("/verify-phone", authMiddleware, async (req, res) => {
	const { otp } = req.body;

	try {
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(400).json({ errors: [{ msg: "User not found" }] });
		}

		if (user.phoneOtp !== parseInt(otp)) {
			return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
		}

		user.isPhoneVerified = true;
		user.isVerified =
			user.isPhoneVerified && user.isEmailVerified ? true : false;
		user.phoneOtp = null;
		await user.save();

		res.json({ msg: "Phone number verified successfully!" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ message: "Something went wrong!" });
	}
});

router.post("/logout", authMiddleware, (req, res) => {
	res.json({ msg: "Logged out successfully" });
});

module.exports = router;
