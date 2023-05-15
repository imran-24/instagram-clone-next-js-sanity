'use client'

import {  Comment, Post } from '@/typings'
import React, { useEffect, useState } from 'react'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {FiMessageCircle} from 'react-icons/fi'
import {HiOutlinePaperAirplane} from 'react-icons/hi'
import {FiBookmark} from 'react-icons/fi'
import {MdOutlineMoreHoriz} from 'react-icons/md'
import {HiOutlineEmojiHappy} from 'react-icons/hi'
import {v4 as uuidv4} from 'uuid';
import { client } from '@/utils/client'
import useAuthStore from '@/store/authstore'
type Props = {
    post: Post
}

const Record = ({ post}: Props) => {
    const [like, setLike] = useState(post?.likes?.length | 0)
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState<Comment[]>([])
    const {userProfile}: any = useAuthStore()
  

  const sendComment = async (e: any) => {
    e.preventDefault();
    if(comment !== ""){          
        client
              .patch(post?._id)
              // Ensure that the `reviews` arrays exists before attempting to add items to it
              .setIfMissing({comments: []})
              // Add the items after the last item in the array (append)
              .insert('after', 'comments[-1]', [{
                    
                      _key: uuidv4(),
                      _type: "comment",
                      "postedBy": {
                        _ref: userProfile?._id,
                        _type: "postedBy"
                      },
                      comment: comment
                    
              }])
              .join({ postedBy: '_ref' })
              .commit()
              .then((response: any) => {
                  setComment('')
                  console.log(response)
                  setComments(response?.comments)
                  
              });
              }

  }


    useEffect(()=>{
        setIsLiked(post?.likes?.length > 0 &&  post?.likes?.findIndex((like) => like?._id === userProfile?._id) != -1)
      },[userProfile?._id, post?.likes])

    useEffect(()=>{
            if(post?.comments?.length > 0 ) setComments(post?.comments)
      },[userProfile?._id, post?.comments])


    console.log(comments)
    const likePost = async (id: string) => {
        if(!isLiked){
            setLike(like + 1)
            setIsLiked(!isLiked)
            client
              .patch(id)
              // Ensure that the `reviews` arrays exists before attempting to add items to it
              .setIfMissing({likes: []})
              // Add the items after the last item in the array (append)
              .insert('after', 'likes[-1]', [{
                    
                      _key: userProfile?._id,
                      _type: "reference",
                      _ref: userProfile?._id,
                           
                    
              }])
              .commit()
              .then(() => {
                  console.log('liked')
              });
    }
    else{
        setLike( like - 1)
        setIsLiked(!isLiked)
        client.patch(id)
        .unset([`likes[_ref == ${userProfile._id}]`]).commit()
        .then(response => {
            console.log('Item removed:', response);
        })
        .catch(error => {
            console.error('Error removing item:', error);
        });

    }
  } 
  return (
    <div className='w-full border flex flex-col gap-2 border-gray-300 rounded-md pt-3 mb-4'>
        <div className='flex  justify-between items-center px-3'>
            <div className='flex gap-4 '>
            <img className='h-10 w-10 rounded-full' src={post?.postedBy?.image} alt="" />
            <p className='font-medium'>{post?.postedBy?.userName}</p>
            </div>
            <div>
            <MdOutlineMoreHoriz fontSize={26} />
            </div>
        </div>
        
        <div>

        </div>
        <div>
            <img className='w-full' src={post?.image?.asset?.url} alt="" />
        </div>
        <div className='flex items-center px-3 justify-between'>
            <div className='flex items-center gap-3'>
                <div onClick={()=> likePost(post?._id)} >
                    {
                        isLiked ? <AiFillHeart className='btnIcon  cursor-pointer text-red-500' fontSize={27} />
                        : <AiOutlineHeart className='btnIcon  cursor-pointer ' fontSize={27} />
                    }
                </div>
                <FiMessageCircle className='hover:opacity-50 cursor-pointer rotate-[275deg]' fontSize={27} />
                <HiOutlinePaperAirplane className='hover:opacity-50 ml-1 cursor-pointer rotate-45' fontSize={25} />
            </div>
            <div>
                <FiBookmark fontSize={27} />
            </div>
        </div>
        <div className='px-4'>
            <p className='font-medium'>{like} {like > 1 ? 'likes' : 'like'}</p>
        </div>
        <div className='px-4'>
            <p>
                <span className='font-medium mr-2'>{post?.postedBy?.userName}</span>
                {post?.caption}
            </p>
        </div>
        {
            comments?.length > 0 && comments?.map((comment: any) => (
                <div className='px-8 py-1  flex gap-2 item-center '>
                <img className='h-7 w-7 rounded-full' src={comment?.postedBy?.image} alt="" />
                <p className='w-full px-1 text-lg border-none outline-none' ><span className='font-semibold text-sm hover:opacity-70 cursor-pointer mr-2'>{comment?.postedBy?.userName}</span>{comment?.comment}</p>
                {/* <Moment className='text-xs w-28 m-auto' fromNow>{comment?._createdAt}</Moment> */}
                </div>
            ))
        }
        <div className='px-3 py-4  border-t  flex items-center'>
            <HiOutlineEmojiHappy fontSize={27} />
            <input type="text" 
            value={comment} 
            className='w-full px-1 border-none outline-none' 
            onChange={(e)=> setComment(e.target.value)}  
            placeholder='Add a comment...'  />
            <button onClick={sendComment} className='font-semibold text-sm  text-sky-500 disabled:opacity-0' 
            disabled={!comment?.trim()} 
            type='submit'>Post</button>
        </div>
        

    </div>
  )
}

export default Record