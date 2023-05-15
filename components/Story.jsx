'use client'

import React from 'react'
import Image from 'next/image'

function Story({username, avatar}) {
  return (
    <div className='h-[67px] ' >
        <img style={{minWidth:'67px',height:'67px'}} 
        className='p-[2px] border-2 cursor-pointer border-red-500 rounded-full 
        hover:scale-110 transition-all duration-150 ease-out' 
        src={avatar} layout='fill' objectFit='contain' />
        <p className='text-center cursor-pointer text-xs w-16 truncate'>{username}</p>
    </div>
  )
}

export default Story