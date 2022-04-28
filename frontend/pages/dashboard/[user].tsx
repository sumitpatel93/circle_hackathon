import Link from 'next/link'
import {useEffect} from 'react'
import {useRouter} from 'next/router';
import axios from "axios";
const Dashboard = () => {

    const router = useRouter();
    const username = router.query.user;



    const getUserDetails = async () =>{
      console.log("heyyaaa")
          
      await axios.get("http://localhost:3010/circleHackathon/userData").then(res => {
        console.log(res)
      }).catch(e=>{
        console.log(e)
      })
      }
      
    // useEffect(() => {
    //   async function getuser() {
    //     await axios.get('http://localhost:3010/circleHackathon/userData', 
    //     ).then((response) => {
    //       console.log(response.data);
    //     });
    //   }
    //   getuser();
    // }, []);


    const handleSubmit =async(e: any) =>{
      e.preventDefault();
      const res = await fetch("http://localhost:3010/circleHackathon/requestFund", {
          method: "POST",
          body: JSON.stringify({
            
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const resJson = await res.json();
    }
    

    return(
    <div className="flex text-white font-thin bg-black min-h-screen flex-col">
      <div className="sticky top-0 z-10 flex justify-between p-10">
        <div className="font-bold text-3xl">
          <Link href="/">
          EasiFi
          </Link>
        </div>
      </div>
      <div className="flex flex-col m-8">
        <p className="text-2xl font-bold p-1">Hello, {username}</p>

        <div className="flex flex-col p-6">
            <p className="p-1 text-xl">Your Credit Score:</p>
            <p className="p-1 text-xl">Loan taken till now:</p>
            <p className="p-1 text-xl">Account creation date: </p>
            <form>
            <p className="p-1 text-xl">Enter loan amount to be taken: <input type="text" className="text-black m-1 rounded p-0.5" /> </p>
            <button  className="bg-white text-black w-min m-4 p-2 px-4">
                Submit
            </button>
            <button type="button" onClick={getUserDetails }  className="bg-white text-black w-min m-4 p-2 px-4">
                Get
            </button>
            </form>
            
            
        </div>
        
      </div>
    </div>
    )

    
}

export default Dashboard