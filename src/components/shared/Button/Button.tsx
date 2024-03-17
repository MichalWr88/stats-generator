import React, { type MouseEvent, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  clickHandle: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'outline' | 'bold';
  rest?: object;
  disabled?: boolean;
};
const primaryClassName =
  'h-8 w-full my-3 p-2.5 bg-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out';

const getClassByType = (type: 'outline' | 'bold' | undefined) => {
  switch (type) {
    case 'outline':
      return 'border-2 bg-transparent border-blue-600 text-gray-600  text-blue-600 rounded hover:bg-black hover:bg-opacity-5 focus:ring-0 focus:bg-transparent';
    case 'bold':
      return '';

    default:
      return 'text-gray-200';
  }
};
const Button = (props: Props) => {
  const { className = '', children, clickHandle, type, rest = {} } = props;
  return (
    <button
      className={`${primaryClassName} ${getClassByType(type)} ${className} ${
        !props.disabled
          ? ''
          : 'cursor-not-allowed bg-gray-400 text-gray-800 hover:bg-gray-400 border-gray-400 focus:bg-gray-400 focus:shadow-none focus:border-gray-400 active:bg-gray-400 active:shadow-none active:border-gray-400 transition-none ease-none'
      }`}
      type="button"
      onClick={(e) => (!props.disabled ? clickHandle(e) : null)}
      {...rest}
    >
      {props.disabled}
      {children}
    </button>
  );
};

export default Button;
