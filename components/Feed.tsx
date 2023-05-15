'use client'
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Stories from '../components/Stories'
import { signOut } from 'next-auth/react';
import { Post } from '@/typings';
import Posts from './Posts';
type Props = {
    posts: Post[]
}

const Feed = (posts: Props) => {

    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
      const suggestions = [...Array(5)].map((_, i) => ({
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
    <div   className='flex-1 bg-gray-50 flex justify-center gap-10 overflow-y-scroll scroll-smooth'>

      <div  className=' w-screen sm:w-[520px] flex flex-col gap-6'>
        {/* stories */}
        <div>
        <Stories />
        </div>
        {/* Post */}
        <div>
        <Posts posts={posts} />
        </div>
        
      </div>

      <div style={{width: '360px'}} className=' hidden xl:block'>
          
          <div  className='lg:mt-12  flex items-center  space-x-4'>
            <img style={{minWidth:'67px',height:'67px'}}  className='rounded-full p-[2px]'
            //  src={session?.user?.image} 
             alt="" />
            <div className='flex-1'>
              <p className='font-medium'>
                {/* {session?.user?.username} */}
                </p>
              <p className='font-light text-gray-400'>
                {/* {session?.user?.name} */}
                </p>
            </div>
            <button 
            onClick={() => signOut({callbackUrl: '/auth/signin'})} 
            type='submit' className='text-sky-500 text-sm font-medium hover:opacity-50 cursor-pointer'> Log out</button>
          </div>
          
          <div className='lg:mt-6 w-full flex flex-col gap-2 '>

            <div className='flex items-center justify-between'>
              <p className=' font-semibold text-gray-400'>Suggestions For You</p>
              <p className='text-sm font-medium hover:opacity-50 cursor-pointer'>See All</p>
            </div>


            <div className='w-full flex flex-col gap-3 '>
              {
                suggestions?.map(suggestion => (
                  <div className=' flex  items-center justify-between'>
                      <div className='flex flex-1 gap-4 items-center'>
                        <img className='h-10 w-10 rounded-full' src={suggestion?.avatar} alt="" />
                        <p className='font-medium hover:opacity-50 cursor-pointer'>{suggestion?.username}</p>
                      </div>
                      <div >
                        <p className='text-sky-500 font-medium text-sm hover:opacity-50 cursor-pointer'>Follow</p>
                      </div>
                      
                  <div>
                  
                </div>
              </div>
                ))
              }
            </div>

            <div>

              <ul className='flex items-center flex-wrap text-sm text-gray-400 gap-2'>
                <a href="#"><li>About</li></a>
                <a href="#"><li>Help</li></a>
                <a href="#"><li>Press</li></a>
                <a href="#"><li>API</li></a>
                <a href="#"><li>Jobs</li></a>
                <a href="#"><li>Privacy</li></a>
                <a href="#"><li>Terms</li></a>
                <a href="#"><li>Locations</li></a>
                <a href="#"><li>Language</li></a>
              </ul>
            </div>

            <div>
              <p className='text-sm text-gray-400'>2022 INSTAGRAM FROM META</p>
            </div>
            
          </div>
        </div> 

    </div>
  )
}

export default Feed