import axios from "../libs/axios";

export const createJob = async (
	body = {
		jobTitle: "",
		jobDescription: "",
		experienceLevel: "",
		candidateEmails: [],
		endDate: "",
	}
) => {
	const { data } = await axios.post("jobs", body);
	return data;
};

export const getJobs = async () => {
	const { data } = await axios.get("jobs");
	return data;
};
