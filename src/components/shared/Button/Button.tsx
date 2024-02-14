import React, { type MouseEvent, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  clickHandle: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'outline' | 'bold';
  rest?: object;
};
const primaryClassName =
  'h-8 w-full my-3 p-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out';

const getClassByType = (type: 'outline' | 'bold' | undefined) => {
  switch (type) {
    case 'outline':
      return 'border-2 bg-transparent border-blue-600 text-blue-600 rounded-full hover:bg-black hover:bg-opacity-5 focus:ring-0 focus:bg-transparent';
    case 'bold':
      return '';

    default:
      return '';
  }
};
const Button = (props: Props) => {
  const { className = '', children, clickHandle, type, rest = {} } = props;
  return (
    <button
      className={`${primaryClassName} ${getClassByType(type)} ${className}`}
      type="button"
      onClick={clickHandle}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
