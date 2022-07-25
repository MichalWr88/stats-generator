import { navBarData } from "@/data/routing";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavLink from "./NavLink";

const NavBar = () => {
  return (
    <header className="bg-gray-500 flex items-center p-2 self-stretch">
      <nav className="flex-1 flex justify-around p-2">
        {navBarData.map((link) => {
          return <NavLink link={link} key={link.id} />;
        })}
      </nav>
    </header>
  );
};

export default NavBar;
