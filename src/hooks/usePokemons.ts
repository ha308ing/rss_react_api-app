import { pokemonApi } from '@/services';
import { IPokemon } from '@/types';
import { useEffect, useState } from 'react';

export const usePokemons = (searchQuery: string) => {
  const [status, setStatus] = useState<null | 'loading' | 'error' | 'success'>(
    null
  );
  const [pokemons, setPokemons] = useState<IPokemon | IPokemon[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadResults = async () => {
      setStatus('loading');

      const data = await pokemonApi.getPokemon(searchQuery, controller.signal);

      setPokemons(data);

      if (data === null) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    };

    loadResults();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  return [pokemons, status] as const;
};
