import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery} from "@tanstack/react-query";
type Props = {
  type?: "succes" | "error" | "normal" | "warning";
};

const Toast = ({ type = "normal" }: Props) => {
 


  return <Toaster />;
};

export default Toast;
