import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../hooks/useUserData";

const PrivateRoute = ({ children }) => {
	const user = useUserData();

	return !user ? <Navigate to="/login" /> : <>{children}</>;
};

PrivateRoute.propTypes = {
	children: PropTypes.any,
};

export default PrivateRoute;
