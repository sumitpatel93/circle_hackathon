import Link from 'next/link'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router';

const Dashboard = () => {

    const router = useRouter();
    const username = router.query.user;

    const [creditScore, setCreditScore] = useState(0);
    const [loan, setLoan] = useState(0);
    const [address, setAddress] = useState("");
    const [amount,setAmount] = useState("");

    const getUserDetails = async () =>{
      console.log("heyyaaa")

      const res = await fetch("http://localhost:3010/circleHackathon/userData", {
          method: "POST",
          body: JSON.stringify({
            userName: username
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const resJson = await res.json()
        console.log(resJson);
        setCreditScore(resJson.Body.userCreditScore);
        setLoan(resJson.Body.loanAmount)
        setAddress(resJson.Body.userAddress)
      }

      useEffect(() => {
        getUserDetails()
      }, [])


    const handleSubmit =async(e: any) =>{
      e.preventDefault();
      const res = await fetch("http://localhost:3010/circleHackathon/requestFund", {
          method: "POST",
          body: JSON.stringify({
            userPrivateKey : "0x177aa6b4e3af0e0923ac3f600e30b28fa20e172e1e4f081e9d2314c2cc7a1f10",
            userAddress : address,
            userName : username,
            amount: amount,
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
            <p className="p-1 text-xl">Your EasiFi Address: {address}</p>
            <p className="p-1 text-xl">Your Credit Score: {creditScore}/1000</p>
            <p className="p-1 text-xl">Loan taken till now: {loan}</p>
            <p className="p-1 text-xl">Account creation date: </p>
            <form>
            <p className="p-1 text-xl">Enter loan amount to be taken: <input type="number" value={amount} className="text-black m-1 rounded p-0.5" onChange={(e) => setAmount(e.target.value)}/> </p>
            <button onClick={handleSubmit} className="bg-white text-black w-min m-4 p-2 px-4">
                Submit
            </button>
            </form>
            
            
        </div>
        
      </div>
    </div>
    )

    
}

export default Dashboard