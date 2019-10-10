import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputTextControlled from '../../presentational/InputTextControlled/InputTextControlled.jsx';
import InputListControlled from '../../presentational/InputListControlled/InputListControlled.jsx';
import InputCheckboxControlled from '../../presentational/InputCheckboxControlled/InputCheckboxControlled.jsx';

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
          <InputListControlled
            value={data.city}
            name="city"
            onChange={handleInput}
            placeholder="Город"
            error={errors.city}
            required={false}
            data={cities}
          />
          <hr />
          <InputTextControlled
            value={data.password}
            name="password"
            onChange={handleInput}
            placeholder="Пароль"
            error={errors.password}
            type="password"
          />
          <InputTextControlled
            value={data.passwordRepeat}
            name="passwordRepeat"
            onChange={handleInput}
            placeholder="Пароль еще раз"
            error={errors.passwordRepeat}
            type="password"
          />
          <hr />
          <InputTextControlled
            value={data.email}
            name="email"
            onChange={handleInput}
            placeholder="Электронная почта"
            error={errors.email}
          />
          <InputCheckboxControlled
            checked={data.acceptedEmailSending}
            name="acceptedEmailSending"
            onChange={handleBoolToggle}
            placeholder="Я согласен"
            type="checkbox"
          />
          <button type="submit" className="submitBtn">
            Изменить
          </button>
          {data.lastChangeDataTime}
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
