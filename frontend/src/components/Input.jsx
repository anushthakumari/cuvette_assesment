import PropTypes from "prop-types";

const Input = ({
	icon,
	rightIcon,
	label,
	className,
	inputClassName,
	id,
	...props
}) => {
	return (
		<div className={`w-full ${className ? className : ""}`}>
			{label && (
				<label htmlFor={id} className="mb-2 text-sm text-gray-900">
					{label}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						{icon}
					</div>
				)}
				<input
					type="search"
					id={id}
					className={`block placeholder-black w-full ${icon ? "ps-10" : ""} ${
						rightIcon ? "pe-10" : ""
					} p-3 text-md border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${
						inputClassName ? inputClassName : ""
					}`}
					{...props}
				/>
				{rightIcon && (
					<div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
						{rightIcon}
					</div>
				)}
			</div>
		</div>
	);
};

Input.propTypes = {
	icon: PropTypes.any,
	rightIcon: PropTypes.any,
	label: PropTypes.string,
	className: PropTypes.string,
	inputClassName: PropTypes.string,
	id: PropTypes.string,
};

export default Input;
