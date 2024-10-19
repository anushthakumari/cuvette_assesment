import PropTypes from "prop-types";

const Button = ({ children, className, ...rest }) => {
	return (
		<button
			className={`w-full bg-blue-500 text-white py-2 rounded-lg mt-2 ${
				className ? className : ""
			}`}
			{...rest}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};

export default Button;
