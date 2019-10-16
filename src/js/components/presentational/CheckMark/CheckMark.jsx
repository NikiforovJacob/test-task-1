import React, { memo } from 'react';
import PropTypes from 'prop-types';

import s from './CheckMark.styl';

const CheckMark = ({ name, description, ...props }) => (
  <label
    htmlFor={`id-${name}`}
    className={s.checkmark}
  >
    <span className={s.checkmark_text}>{description}</span>
    <input
      {...props}
      id={`id-${name}`}
      name={name}
    />
    <span className={s.checkmark_check} />
  </label>
);

CheckMark.defaultProps = {
  type: 'checkbox',
  description: '',
  checked: false,
};

CheckMark.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  description: PropTypes.string,
  type: PropTypes.string,
};

export default memo(CheckMark);
