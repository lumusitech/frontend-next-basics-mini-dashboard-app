import { CartCounter } from '@/shopping-cart/components';

export const metadata = {
  title: 'Shopping Cart',
  description: 'a simple counter',
};

export default function CounterPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <span>Products in cart</span>

      <CartCounter value={50} />
    </div>
  );
}
