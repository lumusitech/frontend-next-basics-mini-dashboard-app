'use client';

import { useAppSelector } from '@/store';
import { IoCartOutline } from 'react-icons/io5';
import { SimpleWidget } from './SimpleWidget';

export const WidgetsGrid = () => {
  const count = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap p-2 justify-center items-center">
      <SimpleWidget
        title={count.toString()}
        subtitle="Products in cart"
        label="Counter"
        href="/dashboard/counter"
        icon={<IoCartOutline size={70} className="text-blue-600" />}
      />
    </div>
  );
};
