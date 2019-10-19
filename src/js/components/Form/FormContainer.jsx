import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cities from '../../../data/cities.json';
import getDateRu, { isEmailValid } from '../../utils/utils.jsx';
import Form from './Form.jsx';

function WrapperFrom(WrappedComponent) {
  class FormWrapped extends PureComponent {
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
        isValid: true,
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

      this.requaredFieldsValid = {
        city: {
          ruName: 'город',
          validCondition: () => null,
        },
        password: {
          ruName: 'пароль',
          validCondition: (value) => ((value.length >= 5) ? null : 'Используйте не менее 5 символов'),
        },
        passwordRepeat: {
          ruName: 'пароль',
          // eslint-disable-next-line react/destructuring-assignment
          validCondition: (value) => ((value === this.state.data.password) ? null : 'Пароли не совпадают'),
        },
        email: {
          ruName: 'E-mail',
          validCondition: (value) => (isEmailValid(value) ? null : 'Неверный E-mail'),
        },
      };

      this.validate = (name, value) => {
        if (value.length === 0) {
          this.setState(({ errors }) => ({ errors: { ...errors, [name]: `Укажите ${this.requaredFieldsValid[name].ruName}` } }));
          return false;
        }
        const error = this.requaredFieldsValid[name].validCondition(value);
        if (!(error === null)) {
          this.setState(({ errors }) => ({ errors: { ...errors, [name]: error } }));
          return false;
        }
        this.setState(({ errors }) => ({ errors: { ...errors, [name]: '' } }));
        return true;
      };

      this.cities = cities
        .filter((c) => c.population > 50000)
        .sort(
          (a, b) => {
            if (a.city > b.city) {
              return 1;
            }
            if (a.city < b.city) {
              return -1;
            }
            return 0;
          },
        )
        .reduce((acc, item, i, arr) => {
          const isItemBigger = Number(item.population) > Number(acc.population);
          if (i === (arr.length - 1)) {
            const largestCity = isItemBigger ? item : acc;
            return [largestCity, ...(arr.filter((curr) => curr !== largestCity))];
          }
          if (isItemBigger) {
            return item;
          }
          return acc;
        }, { population: 0 })
        .map((c) => c.city);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { data, errors } = this.state;
      const isValid = Object.keys(errors).reduce(
        (sum, item) => this.validate(item, data[item]) && sum,
        true,
      );

      if (isValid) {
        const newStateData = { data: { ...data, lastChangeDataTime: getDateRu(new Date()) } };
        this.setState(newStateData, console.log(JSON.stringify(newStateData.data)));
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

export default WrapperFrom(Form);
