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

  reload = () => {
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
          <h1 className="text-[4rem] font-bold mb-3">App Crashed</h1>
          <button
            onClick={this.reload}
            className="border-2 border-green-100 shadow-md shadow-green-500/50 px-4 py-2 bg-green-50 rounded-md"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
