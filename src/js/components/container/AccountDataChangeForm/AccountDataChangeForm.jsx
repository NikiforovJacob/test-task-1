import React from 'react';
import PropTypes from 'prop-types';
import HeaderUserStatus from '../../presentational/HeaderUserStatus/HeaderUserStatus.jsx';
import StatusWrapper from '../../HOCs/StatusWrapper/StatusWrapper.jsx';
import Form from '../Form/Form.jsx';

const HeaderUserStatusWithState = StatusWrapper(HeaderUserStatus);

class AccountDataChangeForm extends React.PureComponent {
  render() {
    const {
      userName,
      userStatus,
      city,
      password,
      email,
      lastChangeDataTime,
    } = this.props;

    return (
      <div className="userDataChangePage">
        <HeaderUserStatusWithState
          userName={userName}
          userStatus={userStatus}
        />
        <Form
          city={city}
          password={password}
          email={email}
          lastChangeDataTime={lastChangeDataTime}
        />
      </div>
    );
  }
}

AccountDataChangeForm.propTypes = {
  userName: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  lastChangeDataTime: PropTypes.string.isRequired,
};

export default AccountDataChangeForm;
