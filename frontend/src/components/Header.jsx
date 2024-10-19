import useUserData from "../hooks/useUserData";
import loginUtils from "../utils/loginUtils";

const Header = () => {
	const user = useUserData();

	const handleChange = (e) => {
		if (e.target.value === "logout") {
			loginUtils.logOut();
			window.location.href = "/";
		}
	};

	return (
		<header className="flex justify-between items-center px-6 py-4 border-b">
			<div className="flex items-center">
				<img src="/logo.svg" alt="Logo" className="w-28" />
			</div>

			<div className="flex items-center space-x-4">
				<div className="text-gray-500">Contact</div>
				{user && (
					<div className="flex items-center space-x-2">
						<select
							onChange={handleChange}
							id="toggle"
							className="border border-gray-300 rounded px-3 py-1 focus:outline-none">
							<option>{user.name}</option>
							<option>logout</option>
						</select>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
