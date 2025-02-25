import { WidgetsGrid } from '@/components';

export const metadata = {
  title: 'Dashboard admin',
  description:
    'Dashboard admin - lorem ipsum dolor sit amet consectetur adipiscing elit',
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="text-3xl mt-2">Dashboard</h1>
      <span className="text-xl">General info</span>

      <WidgetsGrid />
    </div>
  );
}
