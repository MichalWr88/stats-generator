"use client";

import { useSession } from "next-auth/react";

type Props = {
    children: React.JSX.Element;
}

const WrapperSlackSendSession = ({children}: Props) => {
    const { data: session } = useSession();
    if (!session) {
        return null;
    }
  return (children)
}

export default WrapperSlackSendSession