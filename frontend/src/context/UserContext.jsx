import { createContext, useState } from "react";
import PropTypes from "prop-types";

import loginUtils from "../utils/loginUtils";

export const UserLoginContext = createContext();

const UserContext = ({ children }) => {
	const [userLoginData, setuserLoginData] = useState(loginUtils.getUser());

	const values = {
		userData: userLoginData,
		setUserData: (data = {}) => {
			setuserLoginData(data);
			loginUtils.setUser(data);
		},
	};

	return (
		<UserLoginContext.Provider value={values}>
			{children}
		</UserLoginContext.Provider>
	);
};

UserContext.propTypes = {
	children: PropTypes.any,
};

export default UserContext;
