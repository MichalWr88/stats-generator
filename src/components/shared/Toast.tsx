"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';
import useColors from '@/hooks/useColors';


const Toast = () => {
  const colors = useColors();

  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: colors.green[300],
          },
        },
        error: {
          style: {
            background: colors.red[500],
            color: 'white',
          },
        },
      }}
    />
  );
};

export default Toast;
