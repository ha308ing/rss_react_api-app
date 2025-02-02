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

    return <button onClick={this.clickHandler}>Throw Error</button>;
  }
}
