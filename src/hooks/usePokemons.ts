import { pokemonApi } from '@/services';
import { IPokemon } from '@/types';
import { useEffect, useState } from 'react';
import { usePagination } from './usePagination';

export const usePokemons = (searchQuery: string) => {
  const [status, setStatus] = useState<null | 'loading' | 'error' | 'success'>(
    null
  );
  const [pokemons, setPokemons] = useState<IPokemon | IPokemon[] | null>(null);
  const [page, offset, nextHandler, prevHandler] = usePagination();

  useEffect(() => {
    const controller = new AbortController();
    const loadResults = async () => {
      setStatus('loading');

      const data = await pokemonApi.getPokemon(
        searchQuery,
        offset,
        controller.signal
      );

      if (data === null) {
        setStatus('error');
      } else if (data !== undefined) {
        setStatus('success');
        setPokemons(data);
      }
    };

    loadResults();

    return () => {
      controller.abort();
    };
  }, [searchQuery, offset]);

  return [pokemons, status, page, nextHandler, prevHandler] as const;
};
