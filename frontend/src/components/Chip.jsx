import PropTypes from "prop-types";

import Icon from "./Icon";

const Chip = ({ label, onDelete }) => {
	return (
		<div className="flex items-center border border-gray-300 rounded-lg text-gray-500 rounded-full px-2 py-1 m-1">
			<span className="text-sm">{label}</span>
			<button onClick={onDelete} className="ml-2 bg-gray-400 rounded-full p-1">
				<Icon iconName={"cross"} />
			</button>
		</div>
	);
};

Chip.propTypes = {
	label: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default Chip;
