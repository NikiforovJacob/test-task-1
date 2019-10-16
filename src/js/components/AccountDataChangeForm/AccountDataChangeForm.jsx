import React, { memo } from 'react';
import PropTypes from 'prop-types';
import HeaderUserStatus from '../HeaderUserStatus/HeaderUserStatusСontainer.jsx';
import Form from '../Form/FormContainer.jsx';

import styles from './AccountDataChangeForm.styl';

const AccountDataChangeForm = ({ userName, userStatus, ...props }) => (
  <div className={styles.page}>
    <HeaderUserStatus
      userName={userName}
      userStatus={userStatus}
    />
    <Form
      {...props}
    />
  </div>
);

AccountDataChangeForm.propTypes = {
  userName: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  acceptedEmailSending: PropTypes.bool.isRequired,
  lastChangeDataTime: PropTypes.string.isRequired,
};

export default memo(AccountDataChangeForm);
