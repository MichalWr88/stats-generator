import React from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  type?: "succes" | "error" | "normal" | "warning";
};

const Toast = () => {
  return <Toaster />;
};

export default Toast;
