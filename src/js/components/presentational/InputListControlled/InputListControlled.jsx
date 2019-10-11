import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

class InputListControlled extends PureComponent {
  render() {
    const {
      name,
      error,
      labelClass,
      inputClass,
      placeholder,
      data,
      ...props
    } = this.props;
    return (
      <label
        className={cn('label', !!labelClass && labelClass)}
        htmlFor={`id-${name}`}
      >
        <span className="span">{placeholder}</span>
        <select
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
        >
          {[{ city: '' }, ...data].map((city) => <option key={city.city} value={city.city}>{city.city}</option>)}
        </select>
        {!!error && <span className="errorText">{error}</span>}
      </label>
    );
  }
}

InputListControlled.defaultProps = {
  type: 'text',
  error: '',
  required: false,
  autoComplete: 'off',
  labelClass: '',
  inputClass: '',
};

InputListControlled.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
};

export default InputListControlled;
