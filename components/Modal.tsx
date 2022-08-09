import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from './api/hooks/useClickOutside';

type Props = {
  children: React.ReactNode;
  onCloseHandle: () => void;
  opened: boolean;
};

const Modal = ({ children, onCloseHandle, opened }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    setIsOpen(() => opened);

    return () => {
      setIsOpen(() => false);
    };
  }, [opened]);

  const handleClickOutside = () => {
    setIsOpen(() => false);
    if (onCloseHandle) {
      onCloseHandle();
    }
  };
  useOnClickOutside(ref, handleClickOutside);

  if (!isOpen) return null;
  return (
    <div
      className="backdrop-brightness-50 bg-white/30 fixed flex flex-wrap justify-center items-center modal fade  top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto z-10
    modal fade "
      id="exampleModal"
      // tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div
          ref={ref}
          className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
              Edycja sprintu
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">{children}</div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
