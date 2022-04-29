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
    const [created, setCreated] = useState("");
    const [pvtKey, setPvtKey] = useState("");

    const getUserDetails = async () =>{
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
        setCreditScore(resJson.Body.userCreditScore);
        setLoan(resJson.Body.loanAmount)
        setLoan(220);
        setAddress(resJson.Body.userAddress)
      }
      const findUser =async() =>{
        const res = await fetch("http://localhost:3010/circleHackathon/findUser", {
            method: "POST",
            body: JSON.stringify({
              email : username
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          });
          const resJson = await res.json();
          setCreated(resJson.Body.createdAt);
          setPvtKey(resJson.Body.pvtKey);
          console.log(resJson);
      }

      useEffect(() => {
        getUserDetails();
        findUser();
      }, [])
  
  

      


    const handleSubmit =async(e: any) =>{
      e.preventDefault();
      const res = await fetch("http://localhost:3010/circleHackathon/requestFund", {
          method: "POST",
          body: JSON.stringify({
            userPrivateKey : pvtKey,
            userAddress : address,
            userName : username,
            amount: amount,
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const resJson = await res.json();
        console.log(resJson);
    }
    

    const deposit =async() =>{
      const res = await fetch("http://localhost:3010/circleHackathon/deposit", {
          method: "POST",
          body: JSON.stringify({
            userPrivateKey : pvtKey,
            userAddress : address,
            userName : username,
            amount: loan,
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const resJson = await res.json();
        console.log(resJson);
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
          <div className="flex p-3 text-xl">
            <p className="font-semibold mr-5">Your EasiFi Address:</p>
            <p> {address}</p>
          </div>
          <div className="flex p-3 text-xl">
            <p className="font-semibold mr-5">Your Credit Score:</p>
            <p> {creditScore}/1000</p>
          </div>
          <div className="flex p-3 text-xl">
            <p className="font-semibold mr-5">Loans taken till now:</p>
            <p className="mr-5">{loan}</p>
            {loan>0 ? (
              <button onClick={deposit} className="bg-white text-black text-base rounded w-min p-1 px-4">
                Deposit
              </button>
            ) : (
              <p></p>
            )}
          </div>

          <div className="flex p-3 text-xl">
            <p className="font-semibold mr-5">Account creation date: </p>
            <p>{created}</p>
          </div>
            
          <form>
            <div className="flex p-3 text-xl">
              <p className="font-semibold mr-5">Enter loan amount to be taken: </p>
              <p><input type="number" value={amount} className="text-black m-1 rounded p-0.5" onChange={(e) => setAmount(e.target.value)}/> USDC</p>
            </div>
            <button onClick={handleSubmit} className="bg-white text-black rounded w-min m-4 p-2 px-4">
                Submit
            </button>
          </form>
        </div>
        
      </div>
    </div>
    )

    
}

export default Dashboard