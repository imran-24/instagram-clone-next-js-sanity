'use client'

import React, {useRef, useState} from 'react'
import {VscChromeClose} from 'react-icons/vsc'
import {IoArrowBackOutline} from 'react-icons/io5'
import {useSession} from 'next-auth/react';
import useModalStore from '@/store/modalStore';
import { client } from '@/utils/client';
import { SanityAssetDocument } from '@sanity/client';
import useAuthStore from '@/store/authstore';
import { useRouter } from 'next/navigation';
import axios from 'axios';



function Modal(setActive: any) {
 
  const filePickerRef = useRef(null)
  const router = useRouter()
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<SanityAssetDocument | undefined>();
  const [loading, setLoading] = useState(false);
  const {modal, closeModal} = useModalStore()
  const {data: session} = useSession();
  const {userProfile}: any = useAuthStore()
  const uploadPost = async () => {
    if (caption && selectedFile?._id ) {
        // setSavingPost(true);
  
        const doc = {
          _type: 'post',
          caption,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: selectedFile?._id,
            },
          },
          userId: userProfile?._id,
          postedBy: {
            _type: 'postedBy',
            _ref: userProfile?._id,   
          },
          
        };
        setSelectedFile(undefined)
        setCaption('')
        client.create(doc).then(()=>
        closeModal()
        
        )
        // const newPost = await axios.post(`/api/post`, doc);
        // console.log(newPost)
        router.push('/');
      } 


  } 
 const addImageToPost = (e: any) => {
    const imageAsset = e.target.files[0];
        
        // uploading asset to sanity
        if (imageAsset.type === 'image/png' || imageAsset.type === 'image/svg' || imageAsset.type === 'image/jpeg' || imageAsset.type === 'image/gif' || imageAsset.type === 'image/tiff') {
        
          setLoading(true);
          client.assets
            .upload('image', imageAsset, { contentType: imageAsset.type, filename: imageAsset.name })
            .then((document: any) => {
                
              setSelectedFile(document)
              setLoading(false)
            })
            .catch((error) => {
              console.log('Upload failed:', error.message);
            });
        } else {
            setLoading(false)
        }
      }
    
    const deleteImage = (e:any)=> {
        setSelectedFile(undefined)
    }

  return (
   
        
        <>
        {
            modal &&
             (
                <div className="fixed duration-200 ease-out transition-all w-full h-full bg-black bg-opacity-50 flex items-center justify-center top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                    <VscChromeClose onClick={() =>{ 
                        closeModal()
                        setSelectedFile(undefined)
                        // setActive({home: true})
                        }} fontSize={26} className='fixed right-4 top-2 text-white cursor-pointer' />
                    <div className="relative w-[40rem]  h-[40rem] bg-white rounded-xl shadow-lg">
                        <div className='h-12 w-full border-b flex items-center justify-between px-4'>
                            <button disabled={!selectedFile} className='disabled:cursor-not-allowed  cursor-pointer hover:opacity-80' onClick={() =>  setSelectedFile(null) }><IoArrowBackOutline  fontSize={26} className='' /></button>
                            <p className='font-semibold text-lg '>Create new post</p>
                            <button disabled={!selectedFile} onClick={uploadPost} type='button' className='font-semibold text-center text-sky-600 hover:bg-opacity-80 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-0' >Upload post</button>
                            
                        </div>
                        {
                            selectedFile ? 
                            (<div className='w-full h-full grid grid-cols-2 justify-between p-2  '>
                                <img className='w-[300px]' src={selectedFile?.url} />
                                <textarea onChange={(e)=>setCaption(e.target.value)} rows={6} cols={20}  className='border-none resize-none p-2 w-full h-1/2  rounded-md outline-none placeholder:text-light font-light' placeholder='Please enter a caption'></textarea>
                               
                            </div>) :
                            (<div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
                                <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png" alt="" className='w-28' />
                                <p className='text-2xl font-extralight'>Drag photos and videos here</p>
                                <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                <button 
                                onClick={()=> filePickerRef?.current?.click()} 
                                type='button' className='text-white font-semibold text-center bg-sky-600 hover:bg-opacity-80 rounded-lg py-2 px-6' >Select from computer</button>
                            </div>)
                        }
                        
                    </div>
                </div>
            )
        }
        
        </>
        
    
  )
}

export default Modal