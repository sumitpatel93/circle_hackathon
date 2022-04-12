import Image from 'next/image'
import Link from 'next/link'
import block from '../public/block.jpg'
const Login = () =>{
    return(
    <div className="flex flex-col text-white font-thin min-h-screen bg-black">
      <div className="sticky top-0 z-10 flex justify-between p-10">
        <div className="font-bold text-3xl">
          <Link href="/">
          EasiFi
          </Link>
        </div>
      </div>
      <div className="flex flex-col m-2">
        <div className="font-bold text-2xl m-14">
          SME Login
        </div>
        <div className="px-10 flex justify-around">
          <div className="w-1/2">
                <form className="flex flex-col p-2 border-2 rounded-2xl">
                
                <span className="flex flex-col m-1  p-2">
                    Email:
                    <input type="text" className="rounded-md text-xs border-white text-black p-2" placeholder="Email" />              
                </span>
                <span className="flex flex-col m-1 p-2">
                    Password:
                    <input type="password" className="rounded-md  text-xs border-white text-black p-2" placeholder="Password" />            
                </span>
                <span className="m-1 p-2">
                    <button className="bg-smoke shadow-md px-4 p-2">Login</button>
                </span>
                
                </form>
          </div>
          <div className="flex justify-center align-center">
              <Image src={block} alt="block" width="300px" />
          </div>
        </div>
      </div>
    </div>
    )
}

export default Login

