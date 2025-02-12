import { useEffect, useState } from 'react';

export const useLocalStorage = (
  localStorageKey: string = 'searchInputValue',
  defaultValue: string = ''
) => {
  const [localStorageValue, setLocalStorage] = useState<string>(
    () => window.localStorage.getItem(localStorageKey) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, localStorageValue);
  }, [localStorageKey, localStorageValue]);

  return [localStorageValue, setLocalStorage] as const;
};
