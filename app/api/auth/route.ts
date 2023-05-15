import { client } from "@/utils/client";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    
    const {user} = await request.json();
   
    const doc = {
        _id: user.uid,
        _type: 'user',
        userName: user.name,
        image: user.image,
        
    }
    
    
    
    client.createIfNotExists(doc)
    .then(()=>
     NextResponse.json("User created Successfully")
    )
    .catch((Error)=>
     NextResponse.json(Error)
    )
    
        
    
    
}