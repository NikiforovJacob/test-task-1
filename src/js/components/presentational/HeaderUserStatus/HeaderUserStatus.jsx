import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputTextAreaControlled from '../InputTextAreaControlled/InputTextAreaControlled.jsx';

import s from './HeaderUserStatus.styl';

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
      <form className={s.header__statusInput} onSubmit={toggleEditing}>
        <InputTextAreaControlled
          value={userStatus}
          name="userStatus"
          onChange={onChange}
          placeholder="Новый статус: "
        />
        <button
          className={s.header__statusInputBtm}
          type="submit"
        >
            Сохранить
        </button>
      </form>
    );

    const statusText = (
      <div className={s.header__statusTextBlock}>
        <span>{userStatus}</span>
      </div>
    );

    return (
      <div>
        <div className={s.header}>
          <div className={s.header__greeting}>
            {`Здравствуйте, ${userName}`}
          </div>
          {isEditing ? null : (
            <div className={s.header__buttonOnChangeStatusBlock}>
              <button
                className={s.header__buttonOnChangeStatus}
                type="button"
                onClick={toggleEditing}
              >
                Сменить статус
              </button>
            </div>
          )}
        </div>
        <div className={s.header__statusTriangle} />
        <div className={s.header__statusBlock}>
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
