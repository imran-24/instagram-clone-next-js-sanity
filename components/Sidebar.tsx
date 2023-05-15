'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {RiHome5Line} from 'react-icons/ri'
import {RiHome5Fill} from 'react-icons/ri'
import {FiSearch} from 'react-icons/fi'
import {CiSearch} from 'react-icons/ci'
import {MdOutlineExplore} from 'react-icons/md'
import {MdExplore} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {RiMessengerFill} from 'react-icons/ri'
import {CgAddR} from 'react-icons/cg'
import {MdAddBox} from 'react-icons/md'
import {HiOutlineHeart} from 'react-icons/hi'
import {HiHeart} from 'react-icons/hi'
import {RxHamburgerMenu} from 'react-icons/rx'
import {useSession, signOut} from 'next-auth/react'
import { client } from '@/utils/client'
import { toast } from 'react-hot-toast'
import useAuthStore from '@/store/authstore'
import useModalStore from '@/store/modalStore'
// import {useRecoilState} from 'recoil'
// import {modalState} from '../atoms/modalAtom'

type Props = {
    [key: string]: boolean;
}
function Sidebar() {
    const [active, setActive] = useState<Props>({
        home: true,
    })
    const {data: session} =  useSession();
    const {modal, openModal, closeModal} = useModalStore()
    const [isLoading, setLoading] = useState();
  
    const activeBtnText = 'font-semibold hidden xl:flex text-lg text-black  cursor-pointer';
    const NotActiveBtnText = 'font-base hidden xl:flex  text-lg text-black cursor-pointer';

    // const [open, setOpen] = useRecoilState(modalState); 
    const {userProfile, addUser, removeUser} = useAuthStore()
    console.log(modal)
    useEffect(()=> {
      if(!userProfile &&  status === 'authenticated'){
      

      const notification = toast.loading("loading...")
        // await fetch(
        //   // if you want to make an api call you have to make a file with the endpoint in the api directory
        //   '/api/user', {
        //     method: "POST",
        //     headers:{
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       user: session?.user
        //     })
        //   }
        // )

      
      const doc = {
        _id: session?.user?.uid!,
        _type: 'user',
        name: session?.user?.name!,
        userName: session?.user?.username!,
        image: session?.user?.image!,
          
      }
      
      client.createIfNotExists(doc)
      .then((res)=>{
        
        addUser(res)
        // Toast notification to say successfull
        toast.success("logged in",{
          id: notification
        }) 
      })
    
    }
  }
  ,[status])

    useEffect(() => {
      setActive({home: true})
    
    }, [])


    
    
  return (
    
        <div className='h-screen xl:w-64  w-24 bg-white py-8 px-6 hidden md:flex flex-col  justify-between sticky top-0 left-0  border-r '>


            <div className='h-10 w-32 relative hidden xl:grid '>
                <Image src='data:image/png;base64,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' 
                layout='fill' objectFit='contain' alt=''/>
            </div>

            <div className='relative h-10 xl:hidden w-8 mx-auto'>
                <Image src='https://cdn-icons-png.flaticon.com/512/87/87390.png' layout='fill' objectFit='contain' alt=''/>
            </div>

            <div className=' flex flex-col gap-10 '>
                <div onClick={()=> setActive({home: true})}  className='flex items-center gap-4 lg:mx-0 mx-auto'>
                    {
                        active.home ? (<RiHome5Fill fontSize={30}   className='btnIcon' />) : (<RiHome5Line fontSize={30}  className='btnIcon'/>) 
                    }
                    <p className={active.home ? activeBtnText : NotActiveBtnText}>Home</p>
                </div>
                <div onClick={()=> setActive({search: true})} className='flex items-center gap-4  lg:mx-0 mx-auto'>
                    {
                        active.search ? (<FiSearch fontSize={30}  className='btnIcon'/>) : (<FiSearch fontSize={30}  className='btnIcon'/>)
                    }
                    <p className={active.search ? activeBtnText : NotActiveBtnText}>Search</p>
                </div>
                <div onClick={()=> setActive({explore: true})} className='flex items-center gap-4 lg:mx-0 mx-auto'>
                    {
                        active.explore ? (<MdExplore fontSize={30}  className='btnIcon'/>) : (<MdOutlineExplore fontSize={30}  className='btnIcon'/>)
                    }
                    <p className={active.explore ? activeBtnText : NotActiveBtnText}>Explore</p>
                </div>
                <div onClick={()=> setActive({messages: true})} className='flex items-center gap-4 lg:mx-0 mx-auto'>
                    {
                        active.messages ? (<RiMessengerFill fontSize={30}  className='btnIcon'/>) 
                                        : ((<div className='relative'>
                                            <RiMessengerLine fontSize={30}  className='btnIcon'/>
                                            <p className='absolute -top-1 -right-2 bg-red-500 text-sm h-6 w-6 flex items-center justify-center text-white text-center rounded-full cursor-pointer animate-pulse'> 3 </p>
                                            </div>))
                    }
                    <p className={active.messages ? activeBtnText : NotActiveBtnText}>Messages</p>
                </div>
                <div onClick={()=> {
                    setActive({create: true})
                    openModal()
                }}
                    className='flex items-center gap-4 lg:mx-0 mx-auto'>
                    {
                        active.create ? (<MdAddBox fontSize={30}  className='btnIcon'/>) : (<CgAddR fontSize={30}  className='btnIcon'/>)
                    }
                    <p className={active.create ? activeBtnText : NotActiveBtnText}>Create</p>
                </div>
                <div onClick={()=> setActive({notifications: true})} className='flex items-center gap-4 lg:mx-0 mx-auto'>
                    {
                        active.notifications ? (<HiHeart fontSize={30} className='btnIcon'/>) : (<HiOutlineHeart fontSize={30} className='btnIcon'/>)
                    }
                    <p className={active.notifications ? activeBtnText : NotActiveBtnText}>Notifications</p>
                </div>
                <div 
                onClick={()=> {
                    removeUser()
                    signOut({callbackUrl: '/auth/signin'})}}
                
                className='flex items-center gap-4 lg:mx-0 mx-auto cursor-pointer'>
                    <img 
                    src={session?.user?.image! || ""} className='h-8 w-8 rounded-full' alt="" />
                    <p className={active.profile ? activeBtnText : NotActiveBtnText}>Profile</p>
                </div>
            </div>
            <div className=' flex items-center gap-4 lg:mx-0 mx-auto cursor-pointer'>
                <RxHamburgerMenu fontSize={26}  className='btnIcon'/>
                <p className={NotActiveBtnText}>More</p>
            </div>
            

        </div>
    
  )
}

export default Sidebar