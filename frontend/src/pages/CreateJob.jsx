import { useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import Chip from "../components/Chip";

import { createJob } from "../apis/job.apis";

const JobForm = () => {
	const [formData, setFormData] = useState({
		jobTitle: "",
		jobDescription: "",
		experienceLevel: "",
		candidateEmails: [],
		endDate: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleEmailChange = (e) => {
		const value = e.target.value;
		if (value.endsWith(",")) {
			const newEmail = value.slice(0, -1).trim();

			if (!/\S+@\S+\.\S+/.test(newEmail)) {
				alert("Email must be valid");
				return;
			}

			if (newEmail && !formData.candidateEmails.includes(newEmail)) {
				setFormData((prev) => ({
					...prev,
					candidateEmails: [...prev.candidateEmails, newEmail],
				}));
			}
			e.target.value = "";
		}
	};

	const validateForm = () => {
		if (!formData.jobTitle) {
			setError("Job Title is required");
			return false;
		}
		if (!formData.jobDescription) {
			setError("Job Description is required");
			return false;
		}
		if (!formData.experienceLevel) {
			setError("Experience Level is required");
			return false;
		}
		if (formData.candidateEmails.length === 0) {
			setError("At least one candidate email is required");
			return false;
		}
		if (!formData.endDate) {
			setError("End Date is required");
			return false;
		}

		const selectedDate = new Date(formData.endDate);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			setError("End Date must be today or a future date");
			return false;
		}

		setError("");
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setSuccessMessage("");

		try {
			await createJob(formData);
			setSuccessMessage("Job created successfully!");
			setFormData({
				jobTitle: "",
				jobDescription: "",
				experienceLevel: "",
				candidateEmails: [],
				endDate: "",
			});
		} catch (err) {
			console.log(err);
			setError("Failed to create job. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-1/2 mt-10 p-8">
			<form onSubmit={handleSubmit}>
				<div className="mb-6 flex items-center">
					<label
						htmlFor="jobTitle"
						className="w-1/3 text-gray-800 font-medium mb-2">
						Job Title
					</label>
					<Input
						type="text"
						id="jobTitle"
						name="jobTitle"
						value={formData.jobTitle}
						onChange={handleChange}
						className={"w-2/3"}
						inputClassName="!bg-white px-4 !placeholder-gray-400"
						placeholder="Enter Job Title"
					/>
				</div>

				<div className="mb-6 flex items-center">
					<label
						htmlFor="jobDescription"
						className="w-1/3 text-gray-800 font-medium mb-2">
						Job Description
					</label>
					<textarea
						id="jobDescription"
						name="jobDescription"
						value={formData.jobDescription}
						onChange={handleChange}
						className="w-2/3 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter Job Description"
						rows="3"
					/>
				</div>

				<div className="mb-6 flex items-center">
					<label
						htmlFor="experienceLevel"
						className="w-1/3 text-gray-800 font-medium mb-2">
						Experience Level
					</label>
					<select
						id="experienceLevel"
						name="experienceLevel"
						value={formData.experienceLevel}
						onChange={handleChange}
						className="w-2/3 text-gray-400 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
						<option value="" disabled>
							Select Experience Level
						</option>
						<option value="Junior">Junior</option>
						<option value="Mid">Mid</option>
						<option value="Senior">Senior</option>
					</select>
				</div>

				<div className="mb-6 flex items-center">
					<label
						htmlFor="candidateEmails"
						className="w-1/3 text-gray-800 font-medium mb-2">
						Add Candidates
					</label>
					<div className="w-2/3">
						<div className="flex flex-wrap mb-2"></div>
						<div className="p-2 w-full flex flex-wrap text-md border border-gray-300 rounded-lg">
							{formData.candidateEmails.map((email, index) => (
								<Chip
									key={index}
									label={email}
									onDelete={() => {
										setFormData((prev) => ({
											...prev,
											candidateEmails: prev.candidateEmails.filter(
												(_, i) => i !== index
											),
										}));
									}}
								/>
							))}
							<input
								type="text"
								id="candidateEmails"
								name="candidateEmails"
								className="outline-none p-1 w-full"
								onChange={handleEmailChange}
								placeholder="Enter email(s) separated by commas"
							/>
						</div>

						<p className="text-gray-500 text-xs mt-1">
							Press comma (,) to add more emails.
						</p>
					</div>
				</div>

				<div className="mb-6 flex items-center">
					<label
						htmlFor="endDate"
						className="w-1/3 text-gray-800 font-medium mb-2">
						End Date
					</label>
					<Input
						type="date"
						id="endDate"
						name="endDate"
						value={formData.endDate}
						onChange={handleChange}
						className={"w-2/3"}
						inputClassName="!bg-white px-4 text-gray-400"
					/>
				</div>

				{error && <p className="text-red-500 mb-4">{error}</p>}
				{successMessage && (
					<p className="text-green-500 mb-4">{successMessage}</p>
				)}

				<div className="text-right">
					<Button
						type="submit"
						className="w-1/3 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={loading}>
						{loading ? "Loading..." : "Send"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default JobForm;
