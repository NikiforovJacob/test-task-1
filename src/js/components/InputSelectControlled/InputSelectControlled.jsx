import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './InputSelectControlled.styl';

class InputSelectControlled extends PureComponent {
  render() {
    const {
      name,
      description,
      error,
      placeholder,
      data,
      ...props
    } = this.props;
    return (
      <div className={s.fieldSelect}>
        <div className={s.fieldSelect__inputNameBlock}>
          <span className={s.fieldSelect__inputName}>{placeholder}</span>
        </div>
        <div className={s.fieldSelect__inputBlock}>
          <div className={s.fieldSelect__inputBlockArrow}>
            <select
              className={error ? s.fieldSelect__inputError : s.fieldSelect__input}
              {...props}
              name={name}
            >
              {['', ...data].map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
            {!!error && <span className={s.fieldSelect__inputErrorDescription}>{error}</span>}
          </div>
        </div>
        <div className={s.fieldSelect__inputDescriptionBlock}>
          <span className={s.fieldSelect__inputDescription}>{description}</span>
        </div>
      </div>
    );
  }
}

InputSelectControlled.defaultProps = {
  type: 'text',
  description: '',
  error: '',
  required: false,
};

InputSelectControlled.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default InputSelectControlled;
