import React, { memo } from 'react';
import PropTypes from 'prop-types';
import HeaderUserStatus from '../../presentational/HeaderUserStatus/HeaderUserStatus.jsx';
import WrapperStatus from '../../HOCs/WrapperHeader/WrapperHeader.jsx';
import Form from '../Form/Form.jsx';
import FormWrapper from '../../HOCs/FormWrapper/FormWrapper.jsx';

import styles from './AccountDataChangeForm.styl';

const HeaderUserStatusWithState = WrapperStatus(HeaderUserStatus);
const WrappedForm = FormWrapper(Form);

const AccountDataChangeForm = ({ userName, userStatus, ...props }) => (
  <div className={styles.page}>
    <HeaderUserStatusWithState
      userName={userName}
      userStatus={userStatus}
    />
    <WrappedForm
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
