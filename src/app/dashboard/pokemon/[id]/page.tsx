import { Pokemon } from '@/pokemons';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { name, stats } = await getPokemon(id);

  return {
    title: `#${id} - ${name}`,
    description: `page of ${name} pokemon`,
  };
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    // next: { revalidate: 60 * 60 * 24 * 30 * 6 }, // refresh every 6 months
    cache: 'force-cache', // TODO: change to 'no-cache'
  }).then((res) => res.json());

  console.log(pokemon.name, 'fetched');

  return pokemon;
};

export default async function PokemonPage({ params }: Props) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  return (
    <div>
      <h2>{id}</h2>
      <h1>{pokemon.name}</h1>
    </div>
  );
}
