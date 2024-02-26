'use client';

import Image from 'next/image';

import { signIn, useSession, signOut } from 'next-auth/react';

const ProfileButton = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

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

  const UserImage = () => (
    <Image
      className="h-12 w-12 rounded-full bg-gray-400"
      src={session?.user.image}
      alt={session?.user.name}
      width={48}
      height={48}
    />
  );

  const UserName = () => (
    <div className="h-12 w-12 rounded-full bg-gray-400 flex justify-center items-center">{session?.user?.name[0]}</div>
  );

  const SignInButton = () => (
    <span className="h-12 w-12 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
      Sign In
    </span>
  );

  return (
    <button className="relative" onClick={() => clickHandle()}>
      {session?.user?.name ? session?.user?.image ? <UserImage /> : <UserName /> : <SignInButton />}
    </button>
  );
};

export default ProfileButton;
