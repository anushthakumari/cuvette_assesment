import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";

import { requestEmailOtp, verifyEmailOtp } from "../apis/auth.apis"; // Assuming you have these APIs
import useUserContext from "../hooks/useUserContext";
import routeNames from "../constants/routeNames";

const Login = () => {
	const [email, setEmail] = useState(""); // New state for email input
	const [emailOtp, setEmailOtp] = useState("");
	const [isEmailOtpSent, setIsEmailOtpSent] = useState(false); // New state to check if OTP has been sent
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [error, setError] = useState("");
	const [isEmailLoading, setIsEmailLoading] = useState(false); // Loading state for email verification
	const [isOtpLoading, setIsOtpLoading] = useState(false); // Loading state for OTP sending

	const navigate = useNavigate();
	const { userData, setUserData } = useUserContext();

	// Function to request OTP for email
	const handleRequestEmailOtp = async () => {
		setIsOtpLoading(true);
		setError(""); // Reset error state
		try {
			await requestEmailOtp({ email }); // API to request OTP
			setIsEmailOtpSent(true); // OTP sent successfully
		} catch (err) {
			setError("Failed to send OTP. Please try again.");
			console.error(err);
		} finally {
			setIsOtpLoading(false);
		}
	};

	// Function to verify the entered OTP
	const handleEmailVerify = async () => {
		setIsEmailLoading(true); // Set loading to true
		setError(""); // Reset error state
		try {
			const data = await verifyEmailOtp({ email, otp: emailOtp }); // Verify OTP using email and OTP
			setUserData({ ...data.user, isVerified: true });
			setIsEmailVerified(true); // OTP verified
		} catch (err) {
			setError("Email verification failed.");
			console.error(err);
		} finally {
			setIsEmailLoading(false); // Set loading to false after API call
		}
	};

	useEffect(() => {
		if (userData?.isVerified) {
			navigate(routeNames.COMPANY.path);
		}
	}, [navigate, userData]);

	return (
		<div className="flex justify-between gap-3 items-center h-screen p-10">
			<div className="flex-1">
				<p className="text-gray-600">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry standard dummy text ever
					since the 1500s, when an unknown printer took a galley.
				</p>
			</div>
			<div className="flex-1 flex justify-center items-center bg-white p-8">
				<div className="bg-white p-8 rounded-lg border border-blue-600 w-4/5">
					<h2 className="text-2xl text-center font-bold mb-2">Login</h2>
					<p className="text-gray-500 mb-6 text-center">
						Lorem Ipsum is simply dummy text
					</p>

					{error && <p className="text-red-500 text-center mb-4">{error}</p>}

					{/* Input for Email */}
					<div className="mb-4">
						<Input
							placeholder="Email"
							icon={<Icon iconName={"emailIcon"} />}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Button
							className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2"
							onClick={handleRequestEmailOtp}
							disabled={isOtpLoading || isEmailOtpSent}>
							{isOtpLoading ? "Sending OTP..." : "Send OTP"}
						</Button>
					</div>

					{/* OTP Input */}
					{isEmailOtpSent && (
						<div className="mb-4">
							<Input
								placeholder="Enter OTP"
								icon={<Icon iconName={"otpIcon"} />}
								value={emailOtp}
								onChange={(e) => setEmailOtp(e.target.value)}
							/>
							<Button
								className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2"
								onClick={handleEmailVerify}
								disabled={isEmailLoading || isEmailVerified}>
								{isEmailLoading ? "Verifying..." : "Verify OTP"}
							</Button>
						</div>
					)}

					<div className="text-gray-500 mb-4 font-semibold">
						<p className="text-sm text-center">
							Do not have an account?{" "}
							<Link to={routeNames.REGISTER.path} className="text-blue-500">
								register here.
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
