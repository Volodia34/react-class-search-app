import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query({
      query: (searchTerm) => `pokemon/${searchTerm.toLowerCase()}`,
    }),
  }),
});

export const { useFetchItemsQuery } = api;
