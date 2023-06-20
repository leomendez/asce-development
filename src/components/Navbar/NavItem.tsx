import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  title: string;
  onClick: () => void;
};

export const NavItem = ({ href, title, onClick }: Props) => {
  return (
    <Link href={href} className={'font-semibold w-full sm:pb-0 pb-6 sm:flex sm:items-center'} onClick={onClick}>
      <span className="underline-animation">{title}</span>
    </Link>
  );
};
