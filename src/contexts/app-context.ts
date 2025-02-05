import { IPokemon } from '@/types';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IAppContext {
  pokemons: null | IPokemon | IPokemon[];
  status: null | 'loading' | 'error' | 'success';
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const defaultAppContext: IAppContext = {
  pokemons: null,
  status: null,
  searchQuery: '',
  setSearchQuery: () => {},
};

export const AppContext = createContext<IAppContext>(defaultAppContext);
