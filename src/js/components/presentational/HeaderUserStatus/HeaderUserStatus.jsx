import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputTextControlled from '../InputTextControlled/InputTextControlled.jsx';

class HeaderUserStatus extends PureComponent {
  render() {
    const {
      userName,
      userStatus,
      onChange,
      isEditing,
      toggleEditing,
    } = this.props;

    const statusInput = (
      <form onSubmit={toggleEditing}>
        <InputTextControlled
          key="userStatus"
          value={userStatus}
          name="userStatus"
          onChange={onChange}
          placeholder="Логин"
          error=""
          required={false}
        />
        <button type="submit">Сохранить</button>
      </form>
    );

    const statusText = (
      <p>
        {userStatus}
      </p>
    );

    return (
      <div>
        <p>
          <div>Здравствуйте, </div>
          <div>{userName}</div>
          <div>
            <input type="button" value="Сменить статус" onClick={toggleEditing} />
          </div>
        </p>
        <div>
          {isEditing ? statusInput : statusText}
        </div>
      </div>
    );
  }
}

HeaderUserStatus.propTypes = {
  userName: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

export default HeaderUserStatus;
