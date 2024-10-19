import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../hooks/useUserData";
import routeNames from "../constants/routeNames";
import Sidebar from "./Sidebar";

const PrivateOutlet = () => {
	const user = useUserData();

	if (!user) {
		return <Navigate to={routeNames.LOGIN.name} />;
	}

	if (!user.isVerified) {
		return <Navigate to={routeNames.VERIFY.path} />;
	}

	return (
		<>
			<Sidebar>
				<Outlet />
			</Sidebar>
		</>
	);
};

PrivateOutlet.propTypes = {
	children: PropTypes.any,
};

export default PrivateOutlet;
