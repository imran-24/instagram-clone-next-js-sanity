
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      username: string;
      name: string;
      email: string;
      role: string;
      [key: string]: string;
    };
  }
}



interface SanityBody{
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string
}

export interface User extends SanityBody{
  _type: 'user';
  image: string;
  userName: string;
  name: string
}

export interface Comment extends SanityBody{
  _type: 'comment';
  comment: string;
  postedBy: User[]
}

interface Video{
  _type: string;
  asset:{
      _ref: string;
      _type: string;
      url: string
  }
}

interface Image{
  _type: string;
  asset:{
      _ref: string;
      _type: string;
      url: string
  }
}

export interface Post extends SanityBody{
  caption: string;
  comments: Comment[],
  likes: User[];
  postedBy: User;
  topic: string;
  userId: string;
  video: Video;
  image: Image
}



