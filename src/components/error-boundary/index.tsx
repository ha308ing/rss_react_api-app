import React, { ErrorInfo, PropsWithChildren } from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren,
  IErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h1>App Crashed</h1>;
    }

    return this.props.children;
  }
}
