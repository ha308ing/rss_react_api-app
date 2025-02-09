import { IPokemon } from '@/types';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IAppContext {
  pokemons: null | IPokemon | IPokemon[];
  status: null | 'loading' | 'error' | 'success';
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setPokemonDetails: (pokemonName: string) => void;
  pokemonDetails: string | null;
  closePokemonDetails: () => void;
}

const defaultAppContext: IAppContext = {
  pokemons: null,
  status: null,
  searchQuery: '',
  setSearchQuery: () => {},
  setPokemonDetails: () => {},
  pokemonDetails: null,
  closePokemonDetails: () => {},
};

export const AppContext = createContext<IAppContext>(defaultAppContext);
