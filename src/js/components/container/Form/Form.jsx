import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputTextControlled from '../../presentational/InputTextControlled/InputTextControlled.jsx';
import InputSelectControlled from '../../presentational/InputSelectControlled/InputSelectControlled.jsx';
import InputCheckboxControlled from '../../presentational/InputCheckboxControlled/InputCheckboxControlled.jsx';

import s from './Form.styl';

class Form extends PureComponent {
  render() {
    const {
      data,
      errors,
      cities,
      handleInput,
      handleSubmit,
      handleBoolToggle,
    } = this.props;

    return (
      <div className="openBill">
        <form className="openBillForm" onSubmit={handleSubmit}>
          <InputSelectControlled
            value={data.city}
            name="city"
            onChange={handleInput}
            placeholder="Ваш город"
            error={errors.city}
            required={false}
            data={cities}
          />
          <hr className={s.form__hr} />
          <InputTextControlled
            value={data.password}
            name="password"
            onChange={handleInput}
            placeholder="Пароль"
            description="Ваш новый пароль должен содержать не менее 5 символов."
            error={errors.password}
            type="password"
          />
          <InputTextControlled
            value={data.passwordRepeat}
            name="passwordRepeat"
            onChange={handleInput}
            placeholder="Пароль еще раз"
            description="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай ошибки."
            error={errors.passwordRepeat}
            type="password"
          />
          <hr className={s.form__hr} />
          <InputTextControlled
            value={data.email}
            name="email"
            onChange={handleInput}
            placeholder="Электронная почта"
            description="Можно изменить адрес, указанный при регистрации."
            error={errors.email}
            type="select"
          />
          <InputCheckboxControlled
            checked={data.acceptedEmailSending}
            name="acceptedEmailSending"
            onChange={handleBoolToggle}
            placeholder="Я согласен"
            description="принимать актуальную информацию на емейл"
            type="checkbox"
          />
          <div className={s.form__submit}>
            <div className={s.form__submitBtnBlock}>
              <button type="submit" className={s.form__submitBtn}>
                Изменить
              </button>
            </div>
            <div className={s.form__lastChangeDateBlock}>
              <span className={s.form__lastChangeDate}>
                {`последние изменения ${data.lastChangeDataTime}`}
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordRepeat: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    acceptedEmailSending: PropTypes.bool.isRequired,
    lastChangeDataTime: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    city: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordRepeat: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  cities: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBoolToggle: PropTypes.func.isRequired,
};

export default Form;
