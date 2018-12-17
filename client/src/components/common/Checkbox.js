import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e);
	}

	render() {
		const {
			disabled,
			label,
			name,
			value
		} = this.props;

		return (
			<label>
				<input
					type="checkbox"
					checked={value}
					disabled={disabled}
					name={name}
					onChange={this.handleChange}
				/>

				{label}
			</label>
		);
	}
}
Checkbox.propTypes = {
	disabled: PropTypes.bool,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool.isRequired
};
Checkbox.defaultProps = {
	disabled: false
};

export default Checkbox;