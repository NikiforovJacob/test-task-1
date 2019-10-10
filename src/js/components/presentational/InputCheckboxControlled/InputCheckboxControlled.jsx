import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

class InputCheckboxControlled extends PureComponent {
  render() {
    const {
      name,
      error,
      labelClass,
      inputClass,
      placeholder,
      ...props
    } = this.props;
    return (
      <label
        className={cn('label', !!labelClass && labelClass)}
        htmlFor={`id-${name}`}
      >
        <span className="span">{placeholder}</span>
        <input
          {...props}
          className={cn(
            'input',
            !!inputClass && inputClass,
            !!error && 'error',
          )}
          name={name}
          id={`id-${name}`}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {!!error && <span className="errorText">{error}</span>}
      </label>
    );
  }
}

InputCheckboxControlled.defaultProps = {
  type: 'checkbox',
  error: '',
  required: false,
  autoComplete: 'off',
  labelClass: '',
  inputClass: '',
};

InputCheckboxControlled.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
};

export default InputCheckboxControlled;
