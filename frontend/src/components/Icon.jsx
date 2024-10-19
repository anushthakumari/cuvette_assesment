import PropTypes from "prop-types";

const Icon = ({ className, iconName, ...props }) => {
	return (
		<img
			src={`/${iconName}.svg`}
			className={`w-4 h-4 ${className && className}`}
			{...props}
		/>
	);
};

Icon.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	iconName: PropTypes.string,
};

export default Icon;
