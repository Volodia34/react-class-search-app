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
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query<Item[], string | undefined>({
      query: (searchTerm) => {
        if (!searchTerm || searchTerm.toLowerCase() === 'null') {
          return 'pokemon?limit=100&offset=0';
        }
        return `pokemon/${searchTerm.toLowerCase()}`;
      },
      transformResponse: async (response: PokemonApiResponse | PokemonData) => {
        if ('results' in response && response.results) {
          // If `results` is available, fetch detailed Pokemon data
          const items = await Promise.all(
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
          return items;
        } else {
          const pokemonData = response as PokemonData;
          return [
            {
              name: pokemonData.name,
              number: pokemonData.id.toString(),
              imageSrc:
                pokemonData.sprites.other['official-artwork'].front_default,
            },
          ];
        }
      },
    }),
  }),
});

export const { useFetchItemsQuery } = api;
