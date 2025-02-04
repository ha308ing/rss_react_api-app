import { IAppStateExtended } from '@/app';
import { ChangeEvent, FC, FormEvent, useCallback } from 'react';

const LOCALSTORAGE_KEY_SEARCH_INPUT_VALUE = 'searchInputValue';
const SEARCH_INPUT_PLACEHOLDER = 'Enter pokemon name';
const SEARCH_BUTTON_TEXT = 'Search';

export const TopControls: FC<Omit<IAppStateExtended, 'changeStatus'>> = ({
  changeSearchInput,
  changeSearchQuery,
  searchInput,
  status,
}) => {
  const saveInputValueToLocalStorage = useCallback(() => {
    localStorage.setItem(LOCALSTORAGE_KEY_SEARCH_INPUT_VALUE, searchInput);
  }, [searchInput]);

  const changeInputEventHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      changeSearchInput(newValue);
    },
    [changeSearchInput]
  );

  const buttonClickEventHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      changeSearchQuery(searchInput.trim());
      saveInputValueToLocalStorage();
    },
    [changeSearchQuery, saveInputValueToLocalStorage, searchInput]
  );

  return (
    <form onSubmit={buttonClickEventHandler} className="flex justify-center">
      <input
        className="p-2"
        value={searchInput}
        onChange={changeInputEventHandler}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
      />
      <button className="border-1 border-grey-50 px-4 py-2 rounded-sm hover:shadow-sm">
        {status === 'loading' ? 'loading' : SEARCH_BUTTON_TEXT}
      </button>
    </form>
  );
};
