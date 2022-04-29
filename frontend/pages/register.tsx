import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import block from '../public/block.jpg'
const Register = () =>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [error, setError] = useState(false)

  const handleSubmit = async(e: any) =>{
    e.preventDefault();
      const res = await fetch("http://localhost:3010/circleHackathon/register", {
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
      if(res.status==200){setVerifiedUser(true);}
      if(res.status==400 || res.status==404 || res.status==500){setError(true)}
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
      
      {verifiedUser?(
        <div className="flex p-40 justify-center items-center flex-col">
          <p className="text-2xl">Welcome to EasiFi!</p> 
          <p className="text-2xl">Please login with your email to continue</p>
          <button className="bg-white text-black rounded p-3 m-5">
            <Link href="/login">
              Login -&gt;
            </Link>
          </button>
        </div>
      ) : ( 
      <div className="flex flex-col m-2">
        <div className="font-bold text-2xl m-14">
          SME Register
        </div>
        <div className="px-10 flex justify-around">
          <div className="w-1/3">
                <form className="flex flex-col p-2 ">
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
                <span className="m-1 mt-8 self-center p-2">
                    <button onClick={handleSubmit} type="submit" className=" bg-white text-black rounded shadow-md px-4 p-2">Register</button>
                </span>
                <span>
                  {error?(
                    <p>Email already registered</p>
                  ):(
                    <p></p>
                  )}
                </span>
                </form>
          </div>
          <div className="flex justify-center align-center">
              <Image src={block} alt="block" width="400px" />
          </div>
        </div>
      </div>
      )}
    </div>
    )
}

export default Register

