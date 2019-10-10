import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cities from '../../../../data/cities.json';

export default function WrapperFrom(WrappedComponent) {
  class FormWrapped extends Component {
    constructor(props) {
      super(props);

      const {
        city,
        password,
        email,
        acceptedEmailSending,
        lastChangeDataTime,
      } = this.props;

      this.state = {
        data: {
          city,
          password,
          passwordRepeat: password,
          email,
          acceptedEmailSending,
          lastChangeDataTime,
        },
        errors: {
          city: '',
          password: '',
          passwordRepeat: '',
          email: '',
        },
      };

      this.validConditions = {
        password: (value) => ((value.length >= 5) ? null : 'Используйте не менее 5 символов'),
        // eslint-disable-next-line react/destructuring-assignment
        passwordRepeat: (value) => ((value === this.state.data.password) ? null : 'Пароли не совпадают'),
        email: (value) => (RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value) ? null : 'Неверный E-mail'),
        lastChangeDataTime: () => null,
        city: () => null,
      };

      this.validate = (name, value) => {
        if (value.length === 0) {
          this.setState(({ errors }) => ({ errors: { ...errors, [name]: 'поле не должно быть пустым' } }));
          return false;
        }

        const error = this.validConditions[name](value);
        if (!(error === null)) {
          this.setState(({ errors }) => ({ errors: { ...errors, [name]: error } }));
          return false;
        }
        return true;
      };

      this.cities = cities
        .filter((city) => city.population > 50000);
        // .reduce((acc, city) => {
          
        // })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { data } = this.state;
      const isValid = Object.keys(data).reduce(
        (sum, item) => this.validate(item, data[item]) && sum,
        true,
      );
      if (isValid) {
        this.setState(
          ({ data }) => ({ data: { ...data, lastChangeDataTime: Date() } }),
          () => {
            console.log(JSON.stringify(data));
          },
        );
        console.log(JSON.stringify(data));
      }
    };

    handleInput = (e) => {
      const { value, name } = e.currentTarget;
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [name]: value,
        },
        errors: {
          ...errors,
          [name]: '',
        },
      }));
    };

    handleBoolToggle = (e) => {
      const { checked, name } = e.currentTarget;
      this.setState(({ data }) => ({
        data: {
          ...data,
          [name]: checked,
        },
      }));
    };

    render() {
      return (
        <WrappedComponent
          {...this.state}
          cities={this.cities}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          handleBoolToggle={this.handleBoolToggle}
        />
      );
    }
  }

  FormWrapped.propTypes = {
    city: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    acceptedEmailSending: PropTypes.bool.isRequired,
    lastChangeDataTime: PropTypes.string.isRequired,
  };

  return FormWrapped;
}
