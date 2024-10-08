import React from 'react'

type Props = {
    children: React.ReactNode;
    label: string;
    headerComponent?: React.ReactNode;
}

const ListHeader = ({children,label,headerComponent}: Props) => {
  return (
    <div className='p-2'>
    <div className='bg-slate-800 text-white text-center uppercase p-2 flex justify-between'>{label}{headerComponent}</div>
    {children}
    </div>
  )
}

export default ListHeader