import { IPokemon } from '@/types';
import type { FC } from 'react';

interface IPokemonCardProps {
  pokemon: IPokemon;
}

export const PokemonCard: FC<IPokemonCardProps> = ({ pokemon }) => {
  const { id, types: typesArray, image, name, height, weight } = pokemon;

  const types = typesArray.join(', ');

  return (
    <article className="rounded-md border-2 border-red-50 p-4 shadow-md m-6 w-1/3 min-w-32 grow shrink-0">
      <div className="text-sm text-right">#{id}</div>
      <div>
        Name: <span className="font-bold">{name}</span>
      </div>
      <img src={image} alt={name} className="mx-auto" />
      <div>Type: {types}</div>
      <div>Height: {height}</div>
      <div>Weight: {weight}</div>
    </article>
  );
};
