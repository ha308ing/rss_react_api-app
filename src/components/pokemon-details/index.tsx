import { AppContext } from '@/contexts';
import { usePokemons } from '@/hooks';
import { useContext, useEffect, useRef } from 'react';
import { PokemonCard } from '@/components';
import { IPokemon } from '@/types';

export const PokemonDetails = () => {
  const { pokemonDetails, closePokemonDetails } = useContext(AppContext);
  const [pokemons] = usePokemons(pokemonDetails ?? '');
  const cardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      if (event.target == closeButtonRef.current) {
        event.stopPropagation();
        closePokemonDetails();
      }
      if (
        event.target == cardRef.current ||
        cardRef?.current?.contains(event.target as Node)
      ) {
        event.stopPropagation();
      } else {
        event.stopPropagation();
        closePokemonDetails();
      }
    };

    document.addEventListener('click', handler, { capture: true });

    return () => {
      document.removeEventListener('click', handler, { capture: true });
    };
  }, [closePokemonDetails, pokemonDetails]);

  const content =
    pokemonDetails == null ? (
      <h1>where is pokemon?</h1>
    ) : pokemons ? (
      <PokemonCard pokemon={pokemons as IPokemon} size="big" />
    ) : (
      <h1>Loading...</h1>
    );

  return (
    <aside
      ref={cardRef}
      className="fixed top-[25%] bottom-[25%] left-0 right-0 md:left-[50%] border-1 border-gray-300 rounded-2xl bg-white shadow-2xl p-2 flex items-center justify-center"
    >
      {content}
      <button className="absolute top-5 right-5" ref={closeButtonRef}>
        Close
      </button>
    </aside>
  );
};
