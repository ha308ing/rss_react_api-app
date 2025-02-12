import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const getUrlWithParams = (url: string, searchParams: URLSearchParams) =>
  url +
  '?' +
  Array.from(searchParams.entries()).reduce((s, [k, v]) => {
    s += `${k}=${encodeURIComponent(v)}`;
    return s;
  }, '');

export const useDetails = () => {
  const [pokemonDetails, setPokemonDetails_] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setPokemonDetails = useCallback(
    (pokemonName: string) => {
      setPokemonDetails_(pokemonName);
      const url = getUrlWithParams('/details', searchParams);
      navigate(url);
    },
    [navigate, searchParams]
  );

  const closePokemonDetails = useCallback(() => {
    setPokemonDetails_(null);
    const url = getUrlWithParams('/', searchParams);
    navigate(url);
  }, [navigate, searchParams]);

  return { pokemonDetails, setPokemonDetails, closePokemonDetails };
};
