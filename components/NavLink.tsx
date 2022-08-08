import { NavLinkData } from '@/models/Routing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  link: NavLinkData;
};

const NavLink = ({ link }: Props) => {
  const { pathname } = useRouter();
  return (
    <Link href={link.path}>
      <a
        className={`${
          pathname == link.path ? 'border-b-2 border-yellow-400' : ''
        } hover:bg-gray-100 hover:text-gray-700 p-2 text-white rounded-2xl flex items-center
        });`}
      >
        <link.icon className="mr-2 -translate-y-px" />
        {link.label}
      </a>
    </Link>
  );
};

export default NavLink;
