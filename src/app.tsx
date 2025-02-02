import { Component } from 'react';
import { Results, TopControls } from '@/components';
import { ErrorButton } from './components/error-button';
import './app.css';

export interface IAppState {
  status: null | 'loading' | 'error';
  searchInput: string;
  searchQuery: string;
}

type ChangeStateMethod<T, R = void> = (newValue: T) => R;

export interface IAppStateExtended extends IAppState {
  changeStatus: ChangeStateMethod<IAppState['status']>;
  changeSearchQuery: ChangeStateMethod<IAppState['searchQuery']>;
  changeSearchInput: ChangeStateMethod<IAppState['searchInput']>;
}

export class App extends Component {
  state = {
    searchInput: '',
    searchQuery: '',
    status: null,
  };

  changeState =
    (field: keyof typeof this.state) =>
    (newValue: (typeof this.state)[typeof field]) => {
      this.setState((s) => ({
        ...s,
        [field]: newValue,
      }));
    };

  changeSearchQuery = this.changeState('searchQuery');

  changeStatus = this.changeState('status');

  changeSearchInput = this.changeState('searchInput');

  fillInputValueFromLocalStorage = () => {
    const savedValue = localStorage.getItem('searchInputValue');

    if (savedValue == null) return;

    this.changeSearchQuery(savedValue);
    this.changeSearchInput(savedValue);
  };

  componentDidMount(): void {
    this.fillInputValueFromLocalStorage();
  }

  render() {
    return (
      <>
        <h1>API App</h1>
        <ErrorButton />
        <TopControls
          searchQuery={this.state.searchQuery}
          changeSearchQuery={this.changeSearchQuery}
          status={this.state.status}
          searchInput={this.state.searchInput}
          changeSearchInput={this.changeSearchInput}
        />
        <Results
          changeStatus={this.changeStatus}
          searchQuery={this.state.searchQuery}
          status={this.state.status}
        />
      </>
    );
  }
}
