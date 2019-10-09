import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputTextControlled from '../../presentational/InputTextControlled/InputTextControlled.jsx';
import FormWrapper from '../containers/FormWrapper';

// import cities from '../../../../data/cities.json';

class Form extends PureComponent {
  render() {
    const {
      city,
      password,
      email,
      lastChangeDataTime,
      errors,
      handleInput,
      handleSubmit,
    } = this.props;

    //  this.cities = cities
    //   .filter((city) => city.population > 50000)
    //   .reduce((acc, city) => {

    return (
      <div className="openBill">
        <form className="openBillForm" onSubmit={handleSubmit}>
          <InputTextControlled
            key="username"
            value={username}
            name="username"
            onChange={handleInput}
            placeholder="Логин"
            error={errors.username}
            required
          />
          <InputTextControlled
            key="phone"
            value={phone}
            name="phone"
            onChange={handleInput}
            placeholder="Телефон"
            error={errors.phone}
            required
          />
          <InputTextControlled
            key="email"
            value={email}
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Электронная почта"
            error={errors.email}
            required
          />
          <button type="submit" className="submitBtn">
            Изменить
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormWrapper(Form);
