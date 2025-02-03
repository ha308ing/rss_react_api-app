import { POKEMON_API } from '@/config';
import { BaseApi } from '@/services';
import { parsePokemon } from '@/utils';
import { IPokemon, IPokemonApi, IPokemonApiMultiple } from '@/types';

const pokemons = new Map();
const pokemon_ids = new Map();
const pokemonsFirstPage: IPokemon[] = [];
let isFirstPageLoaded = false;

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
    searchQuery?: string | number,
    signal?: AbortSignal
  ): Promise<null | IPokemon | (IPokemon | null)[]> => {
    const cacheValue = getFromCache('' + searchQuery);

    if (cacheValue != null) return cacheValue;

    let data: null | IPokemon | (IPokemon | null)[] = null;

    try {
      const requestQuery = searchQuery
        ? '/' + searchQuery
        : `?limit=${POKEMON_API.API_SEARCH_LIMIT}&offset=0`;

      const apiResponse = await this.genericRequest<
        IPokemonApiMultiple | IPokemonApi
      >(requestQuery, signal);

      const isMultiple =
        (searchQuery == '' || searchQuery == undefined) &&
        isMultipleResponse(apiResponse);

      if (isMultiple) {
        const apiPromises = await Promise.allSettled(
          apiResponse.results.map(({ url: pokemonUrl }) =>
            this.getPokemon(pokemonUrl.replace(POKEMON_API.API_SEARCH_URL, ''))
          )
        );

        data = apiPromises.map((pokemonApiPromise) => {
          if (pokemonApiPromise.status === 'fulfilled') {
            return pokemonApiPromise.value as IPokemon;
          } else {
            return null;
          }
        });
      } else {
        data = parsePokemon(apiResponse as IPokemonApi);
      }
      updateCache(data);
    } catch (error) {
      if (signal?.aborted) return null;
      console.error(error);
    }
    return data;
  };
}

export const pokemonApi = new PokemonApi();

function updateCache(newEntry: IPokemon | (IPokemon | null)[] | null) {
  if (newEntry == null || isFirstPageLoaded === true) return;

  if (Array.isArray(newEntry)) {
    newEntry.forEach((entry) => {
      if (entry === null) return;
      const { id, name } = entry;
      pokemon_ids.set('' + id, name);
      pokemons.set(name, entry);
      pokemonsFirstPage.push(entry);
    });

    isFirstPageLoaded = true;
  } else {
    const { id, name } = newEntry;
    pokemon_ids.set('' + id, name);
    pokemons.set(name, newEntry);
  }
}

function getFromCache(searchQuery: string) {
  if (searchQuery === '' && isFirstPageLoaded === true)
    return pokemonsFirstPage;

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
