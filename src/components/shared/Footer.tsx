import React from 'react';
import Image from 'next/image';
import config from '../../../package.json';
const Footer = () => {
  return (
    <div className="flex self-stretch justify-around p-2 text-white bg-gray-500">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className='flex items-center gap-2'
      >
        Powered by{' '}
        <span className="">
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} data-testid="img" />
        </span>
      </a>
      <div className="flex items-end justify-end w-1/2" data-testid="version">
        v{config.version}
      </div>
    </div>
  );
};

export default Footer;
