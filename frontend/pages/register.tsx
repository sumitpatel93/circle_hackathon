import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import block from '../public/block.jpg'
const Register = () =>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async(e: any) =>{
    e.preventDefault();
    console.log("clicked")
      const res = await fetch("http://localhost:3000/circleHackathon/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          companyName: companyName,
          confirmPassword: confirmPassword,
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const resJson = await res.json();
      console.log(resJson);
  }


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
          SME Register
        </div>
        <div className="px-10 flex justify-around">
          <div className="w-1/2">
                <form className="flex flex-col p-2 border-2 rounded-2xl">
                <span className="flex flex-col m-1 p-2">
                    Company Name:
                    <input type="text" className="rounded-md text-xs border-white text-black p-2" placeholder="SME Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </span>
                <span className="flex flex-col m-1  p-2">
                    Email:
                    <input type="text" className="rounded-md text-xs border-white text-black p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />              
                </span>
                <span className="flex flex-col m-1 p-2">
                    Password:
                    <input type="password" className="rounded-md  text-xs border-white text-black p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />            
                </span>
                <span className="flex flex-col m-1 p-2">
                    Confirm password:
                    <input type="password" className="rounded-md  text-xs border-white text-black p-2" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />            
                </span>
                <span className="m-1 p-2">
                    <button onClick={handleSubmit} type="submit" className=" bg-smoke shadow-md px-4 p-2">Register</button>
                </span>
                
                </form>
          </div>
          <div className="flex justify-center align-center">
              <Image src={block} alt="block" width="400px" />
          </div>
        </div>
      </div>
    </div>
    )
}

export default Register
