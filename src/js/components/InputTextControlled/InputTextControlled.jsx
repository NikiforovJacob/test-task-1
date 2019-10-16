import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './InputTextControlled.styl';

class InpuTextControlled extends PureComponent {
  render() {
    const {
      name,
      description,
      error,
      placeholder,
      ...props
    } = this.props;
    return (
      <label
        htmlFor={`id-${name}`}
      >
        <div className={s.fieldText}>
          <div className={s.fieldText__inputNameBlock}>
            <span className={s.fieldText__inputName}>{placeholder}</span>
          </div>
          <div className={s.fieldText__inputBlock}>
            <input
              className={error ? s.fieldText__inputError : s.fieldText__input}
              {...props}
              name={name}
              id={`id-${name}`}
            />
            {!!error && <span className={s.fieldText__inputErrorDescription}>{error}</span>}
          </div>
          <div className={s.fieldText__inputDescriptionBlock}>
            <span className={s.fieldText__inputDescription}>{description}</span>
          </div>
        </div>
      </label>
    );
  }
}

InpuTextControlled.defaultProps = {
  type: 'text',
  description: '',
  error: '',
  required: false,
  autoComplete: 'off',
};

InpuTextControlled.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  description: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default InpuTextControlled;
