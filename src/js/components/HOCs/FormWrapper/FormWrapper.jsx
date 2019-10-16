import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cities from '../../../../data/cities.json';
import getDateRu from '../../../utils/utils.jsx';

export default function WrapperFrom(WrappedComponent) {
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
        isFetched: false,
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
        acceptedEmailSending: () => null,
        lastChangeDataTime: () => null,
        city: () => null,
      };

      this.validate = (name, value) => {
        if (value.length === 0) {
          const ruFielsNameMap = new Map([
            ['password', 'пароль'],
            ['passwordRepeat', 'пароль'],
            ['email', 'E-mail'],
            ['city', 'город'],
          ]);
          this.setState(({ errors }) => ({ errors: { ...errors, [name]: `Укажите ${ruFielsNameMap.get(name)}` } }));
          return false;
        }

        const error = this.validConditions[name](value);
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
        }, { population: 0 });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { data } = this.state;
      const isValid = Object.keys(data).reduce(
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
