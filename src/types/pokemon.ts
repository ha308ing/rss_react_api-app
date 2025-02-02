export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  stats: Array<[string, number]>;
  types: string[];
}

export interface IPokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: {
      image: string;
    };
  };
  stats: Array<{ base_stat: number; stat: { name: string; url: string } }>;
  types: Array<{ type: { name: string } }>;
}

export interface IPokemonApiMultiple {
  results: Array<{
    name: string;
    url: string;
  }>;
}
