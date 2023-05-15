'use client'

import { Post } from "@/typings"
import Record from "./Post"




type Props = {
    posts: {posts: Post[]}
}

const Posts = ({posts: {posts}}: Props) => {

 
  return (
    <div className='w-full '>
        
    {
        posts?.length > 0 && 
        posts?.map((post: Post) => (
            <Record key={post?._id} post={post} />
        ))
    }

</div>  )
}

export default Posts