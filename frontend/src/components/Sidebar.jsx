import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import routeNames from "../constants/RouteNames";

const Sidebar = ({ children }) => {
	return (
		<div className="flex gap-2 h-screen">
			<nav className="w-16 h-screen border-r flex items-start p-6 space-y-4">
				<Link
					to={routeNames.COMPANY.path}
					className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
					<img src="/home.svg" alt="Logo" className="mx-auto" />
				</Link>
			</nav>
			<div className="p-4 w-full">{children}</div>
		</div>
	);
};

Sidebar.propTypes = {
	children: PropTypes.any,
};

export default Sidebar;
