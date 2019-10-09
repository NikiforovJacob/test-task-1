import React, { Component } from 'react';

export default function StatusWrapper(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      const {
        // eslint-disable-next-line react/prop-types
        userStatus,
      } = this.props;
      this.state = {
        status: userStatus,
        isEditing: false,
      };
    }

    handleChangeInputValue = (e) => {
      const { status } = this.state;
      e.preventDefault();
      console.log(status);
      const { value } = e.currentTarget;
      this.setState((previousState) => ({ status: value, ...previousState }));
    }

    handleStatusEdition = (e) => {
      e.preventDefault();
      this.setState((previousState) => ({ isEditing: !previousState.isEditing, ...previousState }));
    }

    render() {
      const { status, isEditing } = this.state;
      return (
        <WrappedComponent
          onChange={this.handleChangeInputValue}
          toggleEditing={this.handleStatusEdition}
          userStatus={status}
          isEditing={isEditing}
          {...this.props}
        />
      );
    }
  };
}
