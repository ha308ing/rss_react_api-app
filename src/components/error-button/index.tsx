import React from 'react';

export class ErrorButton extends React.Component {
  state = {
    hasError: false,
  };

  clickHandler = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) throw new Error('Trigger error button');

    return (
      <button
        onClick={this.clickHandler}
        className="text-sm bg-red-800 text-red-50 py-2 px-4 fixed bottom-3 right-4"
      >
        Throw Error
      </button>
    );
  }
}
