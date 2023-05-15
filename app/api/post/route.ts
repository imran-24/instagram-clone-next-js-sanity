import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { client } from "../../../utils/client";
import { Post } from "../../../typings";
import { NextResponse } from "next/server";

// query 
const query = groq`
*[_type == "post"] | order(_createdAt desc){
  ..., postedBy->,
  comments[]{
    ..., postedBy->
  }, 
  likes[]->,
  video{
      asset->{
        _id,
        url
      }
    },
  image{
      asset->{
        _id,
        url
      }
    },
}

`


export async function GET(request: Request) {
  const posts = await client.fetch(query)
  
  return NextResponse.json({posts: posts})
}



export async function POST(request: Request) {
  const newPost = request.body 
  // const posts = await client.fetch(query)
  return NextResponse.json({posts: newPost})
}