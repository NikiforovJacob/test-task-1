import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cities from '../../../data/cities.json';
import getDateRu from '../../utils/utils.jsx';

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
        data: {
          city,
          password,
          passwordRepeat: password,
          email,
          acceptedEmailSending,
          lastChangeDataTime,
        },
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
      const { isValid } = this.props;
      const { data } = this.state;

      if (isValid) {
        const newStateData = { data: { ...data, lastChangeDataTime: getDateRu(new Date()) } };
        this.setState(newStateData, console.log(JSON.stringify(newStateData.data)));
      }
    };

    handleInput = (e) => {
      const { value, name } = e.currentTarget;
      const { data: d } = this.state;
      const { validateInput, setStateErrors, errors } = this.props;

      const newErrors = validateInput(name, value, d);
      this.setState(({ data }) => ({
        data: {
          ...data,
          [name]: value,
        },
      }), setStateErrors({ errors: { ...errors, ...newErrors } }));
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
          {...this.props}
          {...this.state}
          cities={this.cities}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          handleBoolToggle={this.handleBoolToggle}
        />
      );
    }
  }

  FormWrapped.defaultProps = {
    isValid: true,
    errors: {},
    validateInput: () => null,
    setStateErrors: () => null,
  };

  FormWrapped.propTypes = {
    city: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    acceptedEmailSending: PropTypes.bool.isRequired,
    lastChangeDataTime: PropTypes.string.isRequired,
    isValid: PropTypes.bool,
    errors: PropTypes.objectOf(PropTypes.string),
    validateInput: PropTypes.func,
    setStateErrors: PropTypes.func,
  };

  return FormWrapped;
}

export default WrapperFrom;
