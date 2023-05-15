import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Feed from '@/components/Feed'
import axios from 'axios'
import { Post } from '@/typings'
import Modal from '@/components/Modal'

type Props = {
  posts: Post[]
}


export default async function Home() {
  const response = await axios.get(`http://localhost:3000/api/post`)
  const posts: Post[] = response.data?.posts

  
  return (
    <div className="max:w-screen  h-screen flex  relative">
      
      <Header />
      <Sidebar />
      {/* Feed */}
      <Feed  posts = {posts} />

      {/* Modal */}
      <Modal />

      <Footer />
    </div>
  )
}
