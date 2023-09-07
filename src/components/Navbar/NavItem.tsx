import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  title: string;
  active: boolean;
  onClick: () => void;
};

export const NavItem = ({ href, title, active, onClick }: Props) => {
  const borderBottom = active ? 'border-b-4 border-teal-600' : '';
  return (
    <Link href={href} className="font-semibold w-full sm:pb-0 pb-6 sm:flex sm:items-center" onClick={onClick}>
      <span className={'underline-animation ' + borderBottom}>{title}</span>
    </Link>
  );
};
