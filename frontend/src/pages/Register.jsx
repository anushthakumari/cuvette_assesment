import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";

import * as authAPIs from "../apis/auth.apis";
import routeNames from "../constants/routeNames";
import useUserContext from "../hooks/useUserContext";

const Register = () => {
	const navigate = useNavigate();

	const { setUserData } = useUserContext();

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		companyName: "",
		email: "",
		employeeSize: "",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		let formErrors = {};

		if (!formData.name.trim()) {
			formErrors.name = "Name is required";
		} else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
			formErrors.name = "Name must not contain special characters or numbers";
		}

		if (!formData.phone.trim()) {
			formErrors.phone = "Phone number is required";
		} else if (!/^\d+$/.test(formData.phone)) {
			formErrors.phone = "Phone must be a valid number";
		}

		if (!formData.companyName.trim()) {
			formErrors.companyName = "Company name is required";
		}

		if (!formData.email.trim()) {
			formErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			formErrors.email = "Email must be valid";
		}

		if (!formData.employeeSize.trim()) {
			formErrors.employeeSize = "Employee size is required";
		} else if (!/^\d+$/.test(formData.employeeSize)) {
			formErrors.employeeSize = "Employee size must be a number";
		}

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			setLoading(true);
			try {
				const resp = await authAPIs.registerUser(formData);
				setUserData(resp.user);
				navigate(routeNames.VERIFY.path);
			} catch (error) {
				const msg = error.response?.data?.errors?.[0]
					? error.response?.data?.errors?.[0]?.msg
					: "Something went wrong!";
				alert(msg);
				console.error("Registration failed:");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="flex justify-between gap-3 items-center h-screen p-10">
			<div className="flex-1">
				<p className="text-gray-600">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry standard dummy text ever
					since the 1500s, when an unknown printer took a galley.
				</p>
			</div>
			<form
				className="flex-1 flex justify-center items-center bg-white p-8"
				onSubmit={handleSubmit}>
				<div className="bg-white p-8 rounded-lg border border-blue-600 w-4/5">
					<h2 className="text-2xl text-center font-bold mb-2">Sign Up</h2>
					<p className="text-gray-500 mb-6 text-center">
						Lorem Ipsum is simply dummy text
					</p>

					{/* Name Input */}
					<div className="mb-4">
						<Input
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							placeholder="Name"
							icon={<Icon iconName={"person"} />}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name}</p>
						)}
					</div>

					{/* Phone Input */}
					<div className="mb-4">
						<Input
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							placeholder="Phone No."
							icon={<Icon iconName={"phone"} />}
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm">{errors.phone}</p>
						)}
					</div>

					{/* Company Name Input */}
					<div className="mb-4">
						<Input
							name="companyName"
							value={formData.companyName}
							onChange={handleInputChange}
							placeholder="Company Name"
							icon={<Icon iconName={"person"} />}
						/>
						{errors.companyName && (
							<p className="text-red-500 text-sm">{errors.companyName}</p>
						)}
					</div>

					{/* Email Input */}
					<div className="mb-4">
						<Input
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Company Email"
							icon={<Icon iconName={"emailIcon"} />}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email}</p>
						)}
					</div>

					{/* Employee Size Input */}
					<div className="mb-4">
						<Input
							name="employeeSize"
							value={formData.employeeSize}
							onChange={handleInputChange}
							placeholder="Employee Size"
							icon={<Icon iconName={"people"} />}
						/>
						{errors.employeeSize && (
							<p className="text-red-500 text-sm">{errors.employeeSize}</p>
						)}
					</div>

					<div className="text-gray-500 mb-4 font-semibold">
						<p className="text-sm text-center">
							By clicking on proceed you will accept our
						</p>
						<p className="text-sm text-center">
							<a className="text-blue-600">Terms</a> &{" "}
							<a className="text-blue-600">Conditions</a>
						</p>
					</div>

					{loading ? (
						<div className="text-center text-blue-500 mb-4">Loading...</div>
					) : (
						<div>
							<Button
								type="submit"
								className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2">
								Proceed
							</Button>
						</div>
					)}

					<div className="text-gray-500 mb-4 font-semibold mt-2">
						<p className="text-sm text-center">
							Already have an account?{" "}
							<Link to={routeNames.LOGIN.path} className="text-blue-500">
								login here.
							</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
