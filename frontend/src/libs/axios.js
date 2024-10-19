import axios from "axios";

import loginUtils from "../utils/loginUtils";
import globals from "../constants/globals";

axios.defaults.baseURL = globals.API_BASE_URL;

axios.interceptors.request.use(
	(config) => {
		const token = loginUtils.getToken();
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;
