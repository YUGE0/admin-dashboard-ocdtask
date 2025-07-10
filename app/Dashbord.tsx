"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logout from './component/Logout'
import Listing from './component/Listing'

const Dashbord = () => {
    const[filteron,setFilteron] = useState(false)
    const[filterby,setFilterby] = useState("")

    const [Approved, setApproved] = useState(0);
    const [Rejected, setRejected] = useState(0);
    const [Requests, setRequsts] = useState(0);
    
    useEffect(() => {
      const fetchCounts = async () => {
        const res = await fetch("/api/listings?count=true");
        const data = await res.json();
        setApproved(data.Approved);
        setRejected(data.Rejected);
        setRequsts(data.All);
      };
      fetchCounts();
    }, [filteron]);
     
    const handleFilter = (filter:string) =>{
      setFilteron(prev => !prev)
      setFilterby(filter)

    }  

  return (
    <div>
      <div className="py-5 text-6xl font-bold uppercase flex justify-between items-center border-b">Dashboard<Image className='hidden md:block' src="/profile.svg" alt="car" height={100} width={100}/></div>
      <div className="py-10 flex justify-between relative">
        <h3 className="">Rental Requests</h3>
        <button onClick={() => setFilteron(prev => !prev)} className="flex gap-3 shadow-[#2A4064] items-center"><Image className='' src="/filter.svg" alt="filter" height={0} width={40}/> Filter</button>
        {filteron &&
        <div className="absolute top-26 right-2 bg-white rounded-2xl rounded-b-3xl shadow-lg text-center w-1/12">
          <h2 onClick={()=>handleFilter("Approved")} className="py-2 border-b-2 hover:shadow-inner hover:shadow-green-400 border-green-400">Approved</h2>
          <h2 onClick={()=>handleFilter("Rejected")} className="py-2 border-b-2 hover:shadow-inner hover:shadow-red-400 border-red-400">Rejected</h2>
          <h2 onClick={()=>handleFilter("Panding")} className="py-2 border-b-2 hover:shadow-inner hover:shadow-sky-400 border-sky-400">Panding</h2>
          <h2 onClick={()=>handleFilter("All")} className="py-2 border-b-2 hover:shadow-inner hover:shadow-cyan-400 rounded-b-3xl border-cyan-400">All</h2>
        </div>}
      </div>
      <div className="flex flex-col xl:flex-row justify-between xl:gap-5">
        <div className="w-full"><Listing filter={filterby}/></div>
        <div className="w-full xl:w-1/4 xl:mx-10 shadow-md shadow-[#2A4064] border border-black/10 rounded-2xl">
          <div className="shadow-md py-2">
            <h1>Total Request</h1>
            <h3 className="px-10">{Requests}</h3>
          </div>
          <div className="flex flex-wrap justify-around gap-10 p-10 pb-0">
          <div className="text-center w-full shadow-[#2A4064] shadow-md p-3 px-5 rounded-2xl">
            <h2 className="text-center">Approved</h2>
            <h3 className="px-10">{Approved}</h3>
          </div>
          <div className="text-center w-full shadow-[#2A4064] shadow-md p-3 px-5 rounded-2xl">
            <h2 className="text-center">Rejected</h2>
            <h3 className="px-10">{Rejected}</h3>
          </div>
          </div>
          <Image className='hidden xl:block xl:w-full p-10' src="/sidebar.svg" alt="car" height={100} width={100}/>
          <div className="flex justify-around">
            <Logout/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashbord
