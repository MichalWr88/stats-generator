import React, { ReactNode } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

type Props = {
  children: ReactNode;
};

const WithNavBar = ({ children }: Props) => {
  return (
    <div className="flex flex-col  min-h-screen min-w-full  items-center">
      <NavBar />
      <main className="bg-gray-300 container mx-auto flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default WithNavBar;
