import React, { Component } from 'react';
import PropTypes from 'prop-types';

function WrapperStatus(WrappedComponent) {
  class StatusWrapped extends Component {
    constructor(props) {
      super(props);
      const {
        userStatus,
      } = this.props;
      this.state = {
        status: userStatus,
        isEditing: false,
      };
    }

    handleChangeInputValue = (e) => {
      e.preventDefault();
      const { value } = e.currentTarget;
      this.setState((previousState) => ({ ...previousState, status: value }));
    }

    handleStatusEdition = (e) => {
      e.preventDefault();
      this.setState((previousState) => ({ ...previousState, isEditing: !previousState.isEditing }));
    }

    render() {
      const { status, isEditing } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          onChange={this.handleChangeInputValue}
          toggleEditing={this.handleStatusEdition}
          userStatus={status}
          isEditing={isEditing}
        />
      );
    }
  }
  StatusWrapped.propTypes = {
    userStatus: PropTypes.string.isRequired,
  };
  return StatusWrapped;
}

export default WrapperStatus;
