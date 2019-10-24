import React, { PureComponent } from 'react';
import { isEmailValid } from '../../utils/utils.jsx';

function WrapperFrom(WrappedComponent) {
  class FormWrapped extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isValid: false,
        errors: {
          city: '',
          password: '',
          passwordRepeat: '',
          email: '',
        },
      };

      this.validConditionPassword = (name, value, data) => {
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
        return passwordErrors;
      };

      this.requaredFieldsValidation = {
        city: {
          ruName: 'город',
          validCondition: (name) => ({ [name]: '' }),
        },
        password: {
          ruName: 'пароль',
          validCondition: this.validConditionPassword,
        },
        passwordRepeat: {
          ruName: 'пароль',
          validCondition: (name, value, data) => ((value === data.password) ? { [name]: '' } : { passwordRepeat: 'Пароли не совпадают' }),
        },
        email: {
          ruName: 'E-mail',
          validCondition: (name, value) => (isEmailValid(value) ? { [name]: '' } : { email: 'Неверный E-mail' }),
        },
      };

      this.validateInput = (name, value, fieldsData) => {
        if (value.length === 0) {
          const { ruName } = this.requaredFieldsValidation[name];
          return { [name]: `Укажите ${ruName}` };
        }
        return this.requaredFieldsValidation[name].validCondition(name, value, fieldsData);
      };
    }

    componentDidUpdate() {
      const { errors, isValid } = this.state;
      const isAllValid = Object.keys(errors).reduce(
        (acc, item) => (errors[item] === '') && acc,
        true,
      );
      if (isAllValid !== isValid) {
        this.setState({ isValid: isAllValid });
      }
    }

    setStateErrors = (newState) => {
      this.setState(newState);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          validateInput={this.validateInput}
          setStateErrors={this.setStateErrors}
        />
      );
    }
  }

  return FormWrapped;
}

export default WrapperFrom;
