import { useContext } from 'react';
import { PokemonCard } from '@/components';
import { AppContext } from '@/contexts';

export const Results = () => {
  const { status, pokemons } = useContext(AppContext);

  if (status === 'loading' || pokemons === null)
    return (
      <img
        src="./loader.gif"
        alt="Loading pokemons"
        className="text-center mt-[5rem] max-w-[15rem] mx-auto"
      />
    );

  if (status === 'error')
    return <h1 className="text-center mt-[5rem]">Failed to get pokemon</h1>;

  const cards = Array.isArray(pokemons) ? (
    pokemons.map((pokemon) => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    ))
  ) : (
    <PokemonCard pokemon={pokemons} />
  );
  return (
    <main className="flex flex-wrap basis-md justify-stretch items-stretch">
      {cards}
    </main>
  );
};
