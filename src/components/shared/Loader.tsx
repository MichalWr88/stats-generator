import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import React from 'react';

const Loader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  if (isFetching || isMutating) {
    return (
      <div className="backdrop-blur-sm bg-white/30 fixed flex flex-wrap justify-center items-center modal fade  top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto z-50">
        <div
          className="spinner-border animate-spin inline-block  border-8 border-green-600 border-l-transparent rounded-full w-36 h-36 "
          role="status"
        ></div>
        <span className="visually-hidden flex-grow flex-shrink w-full text-center font-bold p-4">Loading...</span>
      </div>
    );
  }

  return null;
};

export default Loader;
