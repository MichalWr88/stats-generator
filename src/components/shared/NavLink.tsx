'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { type NavLinkData } from '@/models/Routing';


type Props = {
  link: NavLinkData;
};

const NavLink = ({ link }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={link.path}>
      <div
        data-testid="navLink"
        className={`${
          pathname == link.path ? 'border-b-2 border-yellow-400' : ''
        } hover:bg-gray-100 hover:text-gray-700 p-2 text-white rounded-t-lg flex items-center });`}
      >
        {/* <link.icon className="mr-2 -translate-y-px" /> */}
        {link.label}
      </div>
    </Link>
  );
};

export default NavLink;
