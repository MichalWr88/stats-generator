'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { type NavLinkData } from '@/models/Routing';

type Props = {
  link: NavLinkData;
};

const NavLink = ({ link }: Props) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const linkMemo = useMemo(() => {
    if (link.isAuth && !session?.user?.name) return null;
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
  }, [session, link]);
  return linkMemo;
};

export default NavLink;
