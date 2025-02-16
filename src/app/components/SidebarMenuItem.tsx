'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

interface Props {
  title: string;
  subtitle: string;
  path: string;
  icon: JSX.Element;
}

export const SidebarMenuItem = ({ title, subtitle, path, icon }: Props) => {
  const currentPath = usePathname();

  return (
    <Link
      href={path}
      className={`${currentPath === path && 'bg-blue-600'} w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3  hover:bg-white/5 transition ease-linear duration-150`}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">
          {subtitle}
        </span>
      </div>
    </Link>
  );
};
