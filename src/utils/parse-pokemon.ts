import { IPokemon, IPokemonApi } from '@/types';

export const parsePokemon = (result: IPokemonApi): IPokemon => {
  const {
    id,
    name,
    height,
    weight,
    sprites: {
      front_default: { image },
    },
    stats,
    types,
  } = result;

  return {
    id,
    name,
    height,
    image,
    weight,
    stats: stats.map(({ base_stat, stat: { name } }) => [name, base_stat]),
    types: types.map(({ type: { name } }) => name),
  };
};
