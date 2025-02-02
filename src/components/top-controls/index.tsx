import { IAppStateExtended } from '@/app';
import React, { ChangeEvent, FormEvent } from 'react';

const LOCALSTORAGE_KEY_SEARCH_INPUT_VALUE = 'searchInputValue';
const SEARCH_INPUT_PLACEHOLDER = 'Search';
const SEARCH_BUTTON_TEXT = 'Search';

export class TopControls extends React.Component<
  Omit<IAppStateExtended, 'changeStatus'>
> {
  changeInputEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    console.log({ newValue });

    this.props.changeSearchInput(newValue);
  };

  buttonClickEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.changeSearchQuery(this.props.searchInput);
    this.saveInputValueToLocalStorage();
  };

  saveInputValueToLocalStorage = () => {
    localStorage.setItem(
      LOCALSTORAGE_KEY_SEARCH_INPUT_VALUE,
      this.props.searchInput
    );
  };

  render() {
    return (
      <form onSubmit={this.buttonClickEventHandler}>
        <input
          value={this.props.searchInput}
          onChange={this.changeInputEventHandler}
          placeholder={SEARCH_INPUT_PLACEHOLDER}
        />
        <button>
          {this.props.status === 'loading' ? 'loading' : SEARCH_BUTTON_TEXT}
        </button>
      </form>
    );
  }
}
