import { Item } from '../../../types/Item.ts';

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

export const fetchItems = async (searchTerm: string): Promise<Item[]> => {
  const url = searchTerm
    ? `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
    : 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (data.results) {
    const items = await Promise.all(
      data.results.map(async (item: PokemonResult) => {
        const pokemonResponse = await fetch(item.url);
        if (!pokemonResponse.ok) {
          throw new Error(`HTTP error fetching pokemon detail!`);
        }
        const pokemonData: PokemonData = await pokemonResponse.json();
        return {
          name: item.name,
          number: pokemonData.id.toString(),
          imageSrc: pokemonData.sprites.other['official-artwork'].front_default,
        };
      })
    );
    return items;
  } else {
    const pokemonData: PokemonData = data;
    return [
      {
        name: pokemonData.name,
        number: pokemonData.id.toString(),
        imageSrc: pokemonData.sprites.other['official-artwork'].front_default,
      },
    ];
  }
};
