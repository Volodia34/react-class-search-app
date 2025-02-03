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

export const fetchItems = async (searchTerm: string): Promise<Item[]> => {
  const url = searchTerm
    ? `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
    : 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (data.results) {
    const items = await Promise.all(
      data.results.map(async (item: PokemonResult) => {
        const pokemonData: PokemonData = await fetch(item.url).then((res) =>
          res.json()
        );
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
