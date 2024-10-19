const USERDATA_KEY = "docApp:user";

const getUser = () => {
	const dataStr = localStorage.getItem(USERDATA_KEY);
	if (dataStr) {
		return JSON.parse(dataStr);
	}

	return null;
};

const setUser = (data = {}) => {
	const dataStr = JSON.stringify(data);
	localStorage.setItem(USERDATA_KEY, dataStr);
};

const getToken = () => {
	const userData = getUser();

	if (userData) {
		return userData.token;
	}

	return null;
};

const getUserName = () => {
	const userData = getUser();

	if (userData) {
		return userData.name;
	}

	return null;
};

const getPhone = () => {
	const userData = getUser();

	if (userData) {
		return userData.phone;
	}

	return null;
};

const logOut = () => {
	localStorage.clear();
};

export default {
	getUser,
	setUser,
	getToken,
	getUserName,
	logOut,
	getPhone,
};
