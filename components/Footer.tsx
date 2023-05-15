'use client'

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
import { useState } from 'react'
type Props = {
    [key: string]: boolean;
}
function Footer() {
    
    const [active, setActive] = useState<Props>({
        home: true,
    })
  return (
    <div className='h-14 w-screen z-10 bg-white   md:hidden flex justify-center gap-16 border-t fixed bottom-0 shadow-sm '>

            
                <div onClick={()=> setActive({home: true})}  className='flex items-center lg:mx-0 '>
                    {
                        active.home ? (<RiHome5Fill fontSize={26}   className='btnIcon' />) : (<RiHome5Line fontSize={26}  className='btnIcon'/>) 
                    }
                    
                </div>
                
                <div onClick={()=> setActive({explore: true})} className='flex items-center  lg:mx-0 '>
                    {
                        active.explore ? (<MdExplore fontSize={26}  className='btnIcon'/>) : (<MdOutlineExplore fontSize={26}  className='btnIcon'/>)
                    }
                    
                </div>
                <div onClick={()=> setActive({messages: true})} className='flex items-center  lg:mx-0 '>
                    {
                        active.messages ? (<RiMessengerFill fontSize={26}  className='btnIcon'/>) : (<RiMessengerLine fontSize={26}  className='btnIcon'/>)
                    }
                    
                </div>
                <div onClick={()=> setActive({create: true})} className='flex items-center  lg:mx-0 '>
                    {
                        active.create ? (<MdAddBox fontSize={26}  className='btnIcon'/>) : (<CgAddR fontSize={26}  className='btnIcon'/>)
                    }
                    
                </div>
                
            
            
            

        </div>
  )
}

export default Footer