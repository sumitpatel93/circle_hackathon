import Link from 'next/link'
const Dashboard = () => {

    const getUser = async(e: any) =>{
        e.preventDefault();
          const res = await fetch("http://localhost:3010/circleHackathon/register", {
            method: "POST",
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
      <p>Hello, Sid</p>
    </div>
    )

    
}

export default Dashboard