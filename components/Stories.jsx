'use client'
import React,{useState, useEffect} from 'react'
import {faker} from '@faker-js/faker';
import Story from './Story';
import useAuthStore from '@/store/authstore';

function Stories() {
  // const {data: session} = useSession();
  const [suggestions, setSuggestions] = useState([]);
  const {userProfile} = useAuthStore()
   useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      }));
    setSuggestions(suggestions)
  }, [])
  
  return (
    <div className='p-6 flex overflow-x-scroll  gap-4  border rounded-lg mt-20 md:mt-6 bg-white'>
        <div className='h-[67px] relative ' >
        <img style={{minWidth:'67px',height:'67px'}} 
        className='p-[2px] cursor-pointer rounded-full 
        hover:scale-110 transition-all duration-150 ease-out' 
        src={userProfile?.image} 
        layout='fill' objectFit='contain' 
        />
        <div className='bg-sky-600 h-[20px] w-[20px] rounded-full flex items-center justify-center  font-semibold text-white  border-2 absolute right-1 top-11'>
            <p className='cursor-pointer'>+</p>
        </div>
        <p className='text-center cursor-pointer text-xs w-16 truncate'>Your story</p>
        
    </div> 
        {suggestions.map(profile => (
            <Story key={profile?.userId} username={profile.username} avatar={profile.avatar} />
        ))}
    </div>
  )
}

export default Stories