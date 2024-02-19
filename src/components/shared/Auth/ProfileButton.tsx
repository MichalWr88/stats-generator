'use client';

import Image from 'next/image';

import { signIn, useSession, signOut } from 'next-auth/react';

const ProfileButton = () => {
  const { data: session } = useSession();
  console.log(session);
  const clickHandle = () => {
    if (!session?.user?.name) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      signIn().then((resp) => {
        console.log(resp);
      });
      return;
    }
    console.log('signing out');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signOut().then((resp) => {
      console.log(resp);
    });
  };
  return (
    <button className="relative" onClick={() => clickHandle()}>
      {session?.user?.name ? (
        <Image
          className="h-12 w-12 rounded-full bg-gray-400"
          src={session?.user.image}
          alt={session?.user.name}
          width={48}
          height={48}
        />
      ) : (
        <span className="h-12 w-12 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          Sign In
        </span>
      )}
    </button>
  );
};

export default ProfileButton;
