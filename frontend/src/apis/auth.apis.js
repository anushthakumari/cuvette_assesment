import axios from "../libs/axios";

export const registerUser = async (
	body = {
		name: "",
		email: "",
		phone: "",
		companyName: "",
		employeeSize: 0,
	}
) => {
	const { data } = await axios.post("auth/register", body);
	return data;
};

export const requestEmailOtp = async (
	body = {
		email: "",
	}
) => {
	const { data } = await axios.post("auth/request-email-otp", body);
	return data;
};

export const verifyEmailOtp = async (
	body = {
		email: "",
		otp: "",
	}
) => {
	const { data } = await axios.post("auth/verify-email-login", body);
	return data;
};

export const verifyEmail = async (
	body = {
		otp: "",
	}
) => {
	const { data } = await axios.post("auth/verify-email", body);
	return data;
};

export const verifyPhone = async (
	body = {
		otp: "",
	}
) => {
	const { data } = await axios.post("auth/verify-phone", body);
	return data;
};
