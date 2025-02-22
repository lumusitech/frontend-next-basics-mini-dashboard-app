import { PokemonsResponse, SimplePokemon } from '@/app/pokemons';
import Image from 'next/image';

const getPokemons = async (
  limit = 100,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons: SimplePokemon[] = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));
  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons();

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokemons list <small>Static</small>
      </span>
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {pokemons.map((pokemon) => (
          <Image
            key={pokemon.id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
            width={0}
            height={0}
            style={{ width: 'auto', height: '100px' }}
          />
        ))}
      </div>
    </div>
  );
}
