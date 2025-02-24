import { PokemonsGrid } from '@/pokemons';

export const metadata = {
  title: 'favorites pokemons',
  description: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
};

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Favorites Pokemons<small className="text-blue-500">Global State</small>
      </span>

      <PokemonsGrid pokemons={[]} />
    </div>
  );
}
