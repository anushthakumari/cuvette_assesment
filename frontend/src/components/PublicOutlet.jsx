import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../hooks/useUserData";
import routeNames from "../constants/RouteNames";

const PublicOutlet = () => {
	const user = useUserData();

	if (user) {
		return <Navigate to={routeNames.ROOT.path} />;
	}

	return <Outlet />;
};

PublicOutlet.propTypes = {
	children: PropTypes.any,
};

export default PublicOutlet;
