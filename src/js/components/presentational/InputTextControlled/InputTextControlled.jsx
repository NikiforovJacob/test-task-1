import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

class InpuTextControlled extends PureComponent {
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
          className={cn(
            'input',
            !!inputClass && inputClass,
            !!error && 'error',
          )}
          name={name}
          id={`id-${name}`}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
        {!!error && <span className="errorText">{error}</span>}
      </label>
    );
  }
}

InpuTextControlled.defaultProps = {
  type: 'text',
  error: '',
  required: false,
  autoComplete: 'off',
  labelClass: '',
  inputClass: '',
};

InpuTextControlled.propTypes = {
  value: PropTypes.string.isRequired,
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

export default InpuTextControlled;
