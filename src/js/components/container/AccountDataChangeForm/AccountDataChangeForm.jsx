import React from 'react';
import PropTypes from 'prop-types';
import HeaderUserStatus from '../../presentational/HeaderUserStatus/HeaderUserStatus.jsx';
import WrapperStatus from '../../HOCs/StatusWrapper/WrapperStatus.jsx';
import Form from '../Form/Form.jsx';
import FormWrapper from '../../HOCs/FormWrapper/FormWrapper.jsx';

const HeaderUserStatusWithState = WrapperStatus(HeaderUserStatus);
const WrappedForm = FormWrapper(Form);

class AccountDataChangeForm extends React.PureComponent {
  render() {
    const {
      userName,
      userStatus,
      ...props
    } = this.props;

    return (
      <div className="userDataChangePage">
        <HeaderUserStatusWithState
          userName={userName}
          userStatus={userStatus}
        />
        <WrappedForm
          {...props}
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
  acceptedEmailSending: PropTypes.bool.isRequired,
  lastChangeDataTime: PropTypes.string.isRequired,
};

export default AccountDataChangeForm;
