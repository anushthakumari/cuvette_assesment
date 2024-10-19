import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";

import { verifyEmail, verifyPhone } from "../apis/auth.apis";
import useUserContext from "../hooks/useUserContext";
import routeNames from "../constants/routeNames";

const Verify = () => {
	const [emailOtp, setEmailOtp] = useState("");
	const [phoneOtp, setPhoneOtp] = useState("");
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isPhoneVerified, setIsPhoneVerified] = useState(false);
	const [error, setError] = useState("");
	const [isEmailLoading, setIsEmailLoading] = useState(false);
	const [isPhoneLoading, setIsPhoneLoading] = useState(false);

	const navigate = useNavigate();
	const { userData, setUserData } = useUserContext();

	const handleEmailVerify = async () => {
		setIsEmailLoading(true);
		setError("");
		try {
			await verifyEmail({ otp: emailOtp });
			setIsEmailVerified(true);
			if (isPhoneVerified) {
				setUserData({ ...userData, isVerified: true });
			}
		} catch (err) {
			setError("Email verification failed.");
			console.error(err);
		} finally {
			setIsEmailLoading(false);
		}
	};

	const handlePhoneVerify = async () => {
		setIsPhoneLoading(true);
		setError("");
		try {
			await verifyPhone({ otp: phoneOtp });
			setIsPhoneVerified(true);
			if (isEmailVerified) {
				setUserData({ ...userData, isVerified: true });
			}
		} catch (err) {
			setError("Phone verification failed.");
			console.error(err);
		} finally {
			setIsPhoneLoading(false);
		}
	};

	useEffect(() => {
		if (userData.isVerified) {
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
					<h2 className="text-2xl text-center font-bold mb-2">Sign Up</h2>
					<p className="text-gray-500 mb-6 text-center">
						Lorem Ipsum is simply dummy text
					</p>

					{error && <p className="text-red-500 text-center mb-4">{error}</p>}

					<div className="mb-4">
						<Input
							placeholder="Email OTP"
							icon={<Icon iconName={"emailIcon"} />}
							rightIcon={
								isEmailVerified ? <Icon iconName={"checked"} /> : undefined
							}
							value={emailOtp}
							onChange={(e) => setEmailOtp(e.target.value)}
						/>
						{!isEmailVerified ? (
							<Button
								className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2"
								onClick={handleEmailVerify}
								disabled={isEmailLoading}>
								{isEmailLoading ? "Verifying..." : "Verify"}{" "}
								{/* Show loading state */}
							</Button>
						) : null}
					</div>
					<div>
						<Input
							placeholder="Mobile OTP"
							icon={<Icon iconName={"phone"} />}
							rightIcon={
								isPhoneVerified ? <Icon iconName={"checked"} /> : undefined
							}
							value={phoneOtp}
							onChange={(e) => setPhoneOtp(e.target.value)}
						/>
						{!isPhoneVerified ? (
							<Button
								className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2"
								onClick={handlePhoneVerify}
								disabled={isPhoneLoading}>
								{isPhoneLoading ? "Verifying..." : "Verify"}{" "}
								{/* Show loading state */}
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Verify;
