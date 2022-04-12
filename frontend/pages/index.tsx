import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import super1 from '../public/super1.jpg'

const Home: NextPage = () => {
  return (
    <div className="flex text-white font-thin bg-black min-h-screen flex-col">
      <div className="sticky top-0 z-10 flex justify-between p-10 ">
        <div className="font-bold text-2xl">
          Circle-Hack
        </div>
        <div className="flex justify-around">
          <div className="mx-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black font-normal px-8 p-1 rounded-md">
            <Link href="/register">
              Register!
            </Link>
          </div>
          <div className="mx-1 font-normal p-1 px-8 rounded-md bg-smoke">
          <Link href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="m-10 flex justify-around items-center">
        <div className="flex text-justify w-1/3 font-bold text-2xl">
        Building a sustainable framework for the Small Medium Enterprises to avail loan based on there score of performace without the need of any bank. 
        </div>
        <div className="m-5 mr-10 flex justify-center align-center">
          <Image src={super1}  alt="dao" width="450px" height="550px" />
        </div>
      </div>
    </div>
  )
}

export default Home
