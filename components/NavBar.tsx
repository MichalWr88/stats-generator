import { navBarData } from '@/data/routing';

import React from 'react';
import NavLink from './NavLink';

const NavBar = () => {
  return (
    <header className="bg-gray-800 flex items-center p-2 self-stretch sticky top-0 z-50 shadow-lg navbar navbar-expand-lg ">
      <nav className="flex-1 flex justify-around p-2  shadow-lg navbar navbar-expand-lg ">
        {navBarData.map((link) => {
          return <NavLink link={link} key={link.id} />;
        })}
      </nav>
    </header>
  );
};

export default NavBar;
