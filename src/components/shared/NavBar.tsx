import React from 'react';
import NavLink from './NavLink';
import { navBarData } from '@/data/routing';

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center self-stretch p-2 bg-gray-800 shadow-lg navbar navbar-expand-lg ">
      <nav className="flex justify-around flex-1 p-2 shadow-lg navbar navbar-expand-lg ">
        {navBarData.map((link) => {
          return <NavLink link={link} key={link.id} />;
        })}
      </nav>
    </header>
  );
};

export default NavBar;
