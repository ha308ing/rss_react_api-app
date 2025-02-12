import { AppContext } from '@/contexts';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from 'react';

const SEARCH_INPUT_PLACEHOLDER = 'Enter pokemon name';
const SEARCH_BUTTON_TEXT = 'Search';

export const TopControls = () => {
  const { searchQuery, status, setSearchQuery } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState<string>(() => searchQuery);

  const changeInputEventHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setSearchInput(newValue);
    },
    [setSearchInput]
  );

  const buttonClickEventHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSearchQuery(searchInput.trim());
    },
    [searchInput, setSearchQuery]
  );

  return (
    <form onSubmit={buttonClickEventHandler} className="flex justify-center">
      <input
        className="p-2"
        value={searchInput}
        onChange={changeInputEventHandler}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        data-testid="search-input"
      />
      <button
        className="border-1 border-grey-50 px-4 py-2 rounded-sm hover:shadow-sm"
        data-testid="search-button"
      >
        {status === 'loading' ? 'loading' : SEARCH_BUTTON_TEXT}
      </button>
    </form>
  );
};
