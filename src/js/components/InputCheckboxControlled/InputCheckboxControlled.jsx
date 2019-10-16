import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CheckMark from '../CheckMark/CheckMark.jsx';

import s from './InputCheckboxControlled.styl';

class InputCheckboxControlled extends PureComponent {
  render() {
    const {
      error,
      placeholder,
      ...props
    } = this.props;
    return (
      <div className={s.fieldCheckBox}>
        <div className={s.fieldCheckBox__inputNameBlock}>
          <span className={s.fieldCheckBox__inputName}>{placeholder}</span>
        </div>
        <div className={s.fieldCheckBox__inputBlock}>
          <CheckMark
            className={error ? s.fieldCheckBox__inputError : s.fieldCheckBox__input}
            {...props}
          />
          {!!error && <span className={s.fieldCheckBox__inputErrorDescription}>{error}</span>}
        </div>
      </div>
    );
  }
}

InputCheckboxControlled.defaultProps = {
  type: 'checkbox',
  description: '',
  error: '',
};

InputCheckboxControlled.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  description: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
};

export default InputCheckboxControlled;
