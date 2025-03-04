import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Item } from '../../../types/Item';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

interface PokemonApiResponse {
  results?: PokemonResult[];
  count: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query<
      { items: Item[]; totalCount: number },
      { searchTerm?: string; sort?: string; limit: number; offset: number }
    >({
      query: ({ searchTerm, limit, offset }) => {
        if (!searchTerm || searchTerm.toLowerCase() === 'null') {
          return `pokemon?limit=${limit}&offset=${offset}`;
        }
        return `pokemon/${searchTerm.toLowerCase()}`;
      },
      transformResponse: async (
        response: PokemonApiResponse | PokemonData,
        _,
        arg
      ) => {
        if ('results' in response && response.results) {
          let items = await Promise.all(
            response.results.map(async (item: PokemonResult) => {
              const pokemonResponse = await fetch(item.url);
              if (!pokemonResponse.ok) {
                throw new Error(`HTTP error fetching pokemon detail!`);
              }
              const pokemonData: PokemonData = await pokemonResponse.json();
              return {
                name: item.name,
                number: pokemonData.id.toString(),
                imageSrc:
                  pokemonData.sprites.other['official-artwork'].front_default,
              };
            })
          );
          if (arg.sort === 'name') {
            items = items.sort((a, b) => a.name.localeCompare(b.name));
          }
          return { items, totalCount: response.count };
        } else {
          const pokemonData = response as PokemonData;
          return {
            items: [
              {
                name: pokemonData.name,
                number: pokemonData.id.toString(),
                imageSrc:
                  pokemonData.sprites.other['official-artwork'].front_default,
              },
            ],
            totalCount: 1,
          };
        }
      },
    }),
  }),
});

export const { useFetchItemsQuery } = api;
