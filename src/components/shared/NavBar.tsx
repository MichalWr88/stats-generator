import React from 'react';
import { navBarData } from '@/data/routing';
import ProfileButton from './Auth/ProfileButton';
import NavLink from './NavLink';

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center self-stretch p-2 bg-gray-800 shadow-lg navbar navbar-expand-lg ">
      <nav className="flex justify-around flex-1 p-2 shadow-lg navbar navbar-expand-lg ">
        {navBarData.map((link) => {
          return <NavLink link={link} key={link.id} />;
        })}
      </nav>
      <ProfileButton />
    </header>
  );
};

export default NavBar;
