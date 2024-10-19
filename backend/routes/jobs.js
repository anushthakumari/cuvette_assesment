const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const mailer = require("../helpers/mailer");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
	const userId = new mongoose.Types.ObjectId(req.user.id);

	try {
		const jobs = await Job.find({ userId });
		res.status(200).json(jobs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post(
	"/",
	[
		authMiddleware,
		check("jobTitle").notEmpty().withMessage("Job title is required"),
		check("jobDescription")
			.notEmpty()
			.withMessage("Job description is required"),
		check("experienceLevel")
			.notEmpty()
			.withMessage("Experience level is required"),
		check("candidateEmails")
			.isArray({ min: 1 })
			.withMessage("At least one candidate email is required")
			.custom((value) => {
				if (!value.every((email) => /\S+@\S+\.\S+/.test(email))) {
					throw new Error("Some emails are not valid");
				}
				return true;
			}),
		check("endDate").isISO8601().withMessage("End date must be a valid date"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			jobTitle,
			jobDescription,
			experienceLevel,
			candidateEmails,
			endDate,
		} = req.body;
		const userId = req.user.id;

		try {
			const newJob = new Job({
				jobTitle,
				jobDescription,
				experienceLevel,
				candidateEmails,
				endDate,
				userId,
			});

			await newJob.save();

			await mailer.sendEmail(
				candidateEmails,
				"Please verify your accout!",
				"Hi,\n We have posted a job that you would like \n" +
					jobTitle +
					"\n" +
					jobDescription
			);

			res
				.status(201)
				.json({ message: "Job created successfully!", job: newJob });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal server error" });
		}
	}
);

router.delete("/:jobid", authMiddleware, async (req, res) => {
	const userId = new mongoose.Types.ObjectId(req.user.id);
	const jobId = new mongoose.Types.ObjectId(req.params.jobid);

	try {
		const job = await Job.findOne({ _id: jobId, userId });
		if (!job) {
			return res.status(404).json({
				error: "Job not found or you are not authorized to delete it",
			});
		}

		await Job.deleteOne({ _id: jobId });
		res.status(200).json({ message: "Job deleted successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
