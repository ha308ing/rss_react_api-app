import { POKEMON_API } from '@/config';
import { BaseApi } from '@/services';
import { parsePokemon } from '@/utils';
import { IPokemon, IPokemonApi, IPokemonApiMultiple } from '@/types';

const pokemons = new Map();
const pokemon_ids = new Map();
const pokemonsPages: Record<number, IPokemon[]> = {};

class PokemonApi extends BaseApi {
  constructor() {
    super(POKEMON_API.API_SEARCH_URL);
  }

  genericRequest = async <T = unknown>(
    searchQuery: string,
    signal?: AbortSignal
  ): Promise<T> => {
    return await this.fetch(searchQuery, signal);
  };

  getPokemon = async (
    searchQuery: string | null = null,
    offset: number = 0,
    signal?: AbortSignal
  ): Promise<null | IPokemon | IPokemon[] | undefined> => {
    const searchQueryString = searchQuery ?? '';
    const cacheValue = getFromCache('' + searchQueryString, offset);

    if (cacheValue != null) return cacheValue;

    let data: null | IPokemon | IPokemon[] = null;

    try {
      const requestQuery = searchQueryString
        ? '/' + searchQueryString
        : `?limit=${POKEMON_API.API_SEARCH_LIMIT}&offset=${offset}`;

      const apiResponse = await this.genericRequest<
        IPokemonApiMultiple | IPokemonApi
      >(requestQuery, signal);

      const isMultiple =
        (searchQueryString == '' || searchQueryString == undefined) &&
        isMultipleResponse(apiResponse);

      if (isMultiple) {
        if (apiResponse.results.length === 0) return null;
        const apiPromises = await Promise.allSettled(
          apiResponse.results.map(({ url: pokemonUrl }) =>
            this.getPokemon(pokemonUrl.replace(POKEMON_API.API_SEARCH_URL, ''))
          )
        );

        data = apiPromises
          .map((pokemonApiPromise) => {
            if (pokemonApiPromise.status === 'fulfilled') {
              return pokemonApiPromise.value as IPokemon;
            } else {
              return null;
            }
          })
          .filter((result) => result) as IPokemon[];
      } else {
        data = parsePokemon(apiResponse as IPokemonApi);
      }
      updateCache(data, offset);
    } catch (error) {
      if (signal?.aborted) return undefined;
      console.error(error);
    }
    return data;
  };
}

export const pokemonApi = new PokemonApi();

function updateCache(
  newEntry: IPokemon | (IPokemon | null)[] | null,
  offset: number
) {
  if (newEntry == null || pokemonsPages[offset] != undefined) return;

  if (Array.isArray(newEntry)) {
    pokemonsPages[offset] = [];
    newEntry.forEach((entry) => {
      if (entry === null) return;
      const { id, name } = entry;
      pokemon_ids.set('' + id, name);
      pokemons.set(name, entry);
      pokemonsPages[offset].push(entry);
    });
  } else {
    const { id, name } = newEntry;
    pokemon_ids.set('' + id, name);
    pokemons.set(name, newEntry);
  }
}

function getFromCache(searchQuery: string, offset: number) {
  if (searchQuery === '' && pokemonsPages[offset] != undefined)
    return pokemonsPages[offset];

  if (pokemons.has(searchQuery)) return pokemons.get(searchQuery);

  if (pokemon_ids.has(searchQuery)) {
    const name = pokemon_ids.get(searchQuery);
    return pokemons.get(name);
  }

  return null;
}

function isMultipleResponse(
  response: unknown
): response is IPokemonApiMultiple {
  return (response as IPokemonApiMultiple)?.results !== undefined;
}
