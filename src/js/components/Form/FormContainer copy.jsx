import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cities from '../../../data/cities.json';
import getDateRu, { isEmailValid } from '../../utils/utils.jsx';
// import Form from './Form.jsx';

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
        isValid: false,
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

      this.validConditionPassword = (name, value) => {
        const { data } = this.state;
        let passwordErrors = {
          password: '',
          passwordRepeat: '',
        };
        if (data.passwordRepeat !== value) {
          passwordErrors = {
            ...passwordErrors,
            passwordRepeat: 'Пароли не совпадают',
          };
        }
        if (value.length < 5) {
          passwordErrors = {
            ...passwordErrors,
            password: 'Используйте не менее 5 символов',
          };
        }
        if (Object.keys(passwordErrors).length !== 0) {
          return passwordErrors;
        }
        return [name, 'passwordRepeat'];
      };

      this.requaredFieldsValid = {
        city: {
          ruName: 'город',
          validCondition: (name) => [name],
        },
        password: {
          ruName: 'пароль',
          validCondition: this.validConditionPassword,
        },
        passwordRepeat: {
          ruName: 'пароль',
          // eslint-disable-next-line react/destructuring-assignment
          validCondition: (name, value) => ((value === this.state.data.password) ? [name] : { passwordRepeat: 'Пароли не совпадают' }),
        },
        email: {
          ruName: 'E-mail',
          validCondition: (name, value) => (isEmailValid(value) ? [name] : { email: 'Неверный E-mail' }),
        },
      };

      this.validate = (name, value) => {
        if (value.length === 0) {
          const { ruName } = this.requaredFieldsValid[name];
          return { [name]: `Укажите ${ruName}` };
        }
        const error = this.requaredFieldsValid[name].validCondition(name, value);
        if (!(Array.isArray(error))) {
          return error;
        }
        const refreshedErrors = error.reduce((acc, item) => ({ ...acc, [item]: '' }), {});
        return refreshedErrors;
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

    componentDidUpdate() {
      console.log('mount');
      const { errors, isValid } = this.state;
      const isAllValid = Object.keys(errors).reduce(
        (acc, item) => (errors[item] === '') && acc,
        true,
      );
      console.log(isAllValid);
      if (isAllValid !== isValid) {
        this.setState({ isValid: isAllValid });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { data, isValid } = this.state;

      if (isValid) {
        const newStateData = { data: { ...data, lastChangeDataTime: getDateRu(new Date()) } };
        this.setState(newStateData, console.log(JSON.stringify(newStateData.data)));
      }
    };

    handleInput = (e) => {
      const { value, name } = e.currentTarget;
      const newErrors = this.validate(name, value);
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [name]: value,
        },
        errors: {
          ...errors,
          ...newErrors,
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

export default WrapperFrom;
