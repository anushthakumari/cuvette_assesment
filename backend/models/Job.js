const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		jobTitle: {
			type: String,
			required: true,
			trim: true,
		},
		jobDescription: {
			type: String,
			required: true,
			trim: true,
		},
		experienceLevel: {
			type: String,
			enum: ["Junior", "Mid", "Senior"],
			required: true,
		},
		candidateEmails: {
			type: [String],
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
