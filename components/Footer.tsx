import React from 'react';
import Image from 'next/image';
import { version } from '../package.json';
const Footer = () => {
  return (
    <div className="bg-gray-500 self-stretch flex justify-around text-white p-2">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className="">
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
      <div className="flex justify-end items-end w-1/2">v{version}</div>
    </div>
  );
};

export default Footer;
