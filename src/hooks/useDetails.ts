import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useDetails = () => {
  const [details, setSearchParams] = useSearchParams();
  const [pokemonDetails, setPokemonDetails_] = useState<string | null>(null);

  const setPokemonDetails = useCallback(
    (pokemonName: string) => {
      setSearchParams((previous) => {
        previous.set('details', '1');
        return previous;
      });

      setPokemonDetails_(pokemonName);
    },
    [setSearchParams]
  );

  const closePokemonDetails = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete('details');
      return prev;
    });
    setPokemonDetails_(null);
  }, [setSearchParams]);

  return { details, pokemonDetails, setPokemonDetails, closePokemonDetails };
};
