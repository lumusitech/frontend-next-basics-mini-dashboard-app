import { PokemonsGrid, PokemonsResponse, SimplePokemon } from '@/pokemons';

export const metadata = {
  title: 'first 150 pokemons',
  description: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
};

const getPokemons = async (
  limit = 150,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons: SimplePokemon[] = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  // throw new Error('This is a fake error to test error page');
  // throw notFound();

  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons();

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokemons list <small className="text-blue-500">Static</small>
      </span>

      <PokemonsGrid pokemons={pokemons} />
    </div>
  );
}
