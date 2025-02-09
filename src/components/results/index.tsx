import { useCallback, useContext } from 'react';
import { PokemonCard } from '@/components';
import { AppContext } from '@/contexts';

export const Results = () => {
  const { status, pokemons, setPokemonDetails } = useContext(AppContext);

  const setPokemonDetails_ = useCallback(
    (pokemonName: string) => () => {
      setPokemonDetails(pokemonName);
    },
    [setPokemonDetails]
  );

  if (status === 'loading' || status == null)
    return (
      <img
        src="./loader.gif"
        alt="Loading pokemons"
        className="text-center mt-[5rem] max-w-[15rem] mx-auto"
      />
    );

  if (status === 'error')
    return <h1 className="text-center mt-[5rem]">Failed to get pokemon</h1>;

  if (pokemons != null) {
    const cards = Array.isArray(pokemons) ? (
      pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          clickHandler={setPokemonDetails_(pokemon.name)}
        />
      ))
    ) : (
      <PokemonCard
        pokemon={pokemons}
        clickHandler={setPokemonDetails_(pokemons.name)}
      />
    );
    return (
      <main className="flex flex-wrap basis-md justify-stretch items-stretch">
        {cards}
      </main>
    );
  }

  return null;
};
