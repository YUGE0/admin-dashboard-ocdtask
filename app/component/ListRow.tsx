"use client"
import Image from 'next/image';
import React, { useState } from 'react'

interface ListingProps {
    id:number;
    Brand:string;
    Model:string;
    Year:number; 
    Price:number;
    Status:string;
}

const ListRow = ({id, Brand, Model, Year, Price, Status,}:ListingProps) => {
  const[cbrand,setBrand] = useState(Brand);
  const[cmodel,setModel] = useState(Model);
  const[cyear,setYear] = useState(Year);
  const[cprice,setPrice] = useState(Price);
  const[cstatus,setStatus] = useState(Status);
  const[editdilog,setEditdilog] = useState(false);

  const handleStatuschange = (action:string) =>{
    console.log("Action clicked:", action);
    action == "Approved" ? setStatus("Approved") : action == "Rejected" ? setStatus("Rejected") : ""
    fetch("/api/listings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, status: action }),
    });
  }

  const handleEdit = async () => {
    try {
      const res = await fetch("/api/listings", {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,         
          Brand: cbrand,
          Model: cmodel,
          Year: cyear,
          Price: cprice,
          Status: cstatus,
        }),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("Updated successfully:", data);
        setEditdilog(false); 
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating listing:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center mt-10 py-2 rounded-xl shadow-sm border border-black/20">
        <div className="grid grid-cols-2 md:grid-cols-4 overflow-hidden w-full items-center">
        {Brand==="BMW"?
          <h2 className="mx-10 py-2 px-3 rounded-full flex items-center justify-center gap-3 shadow-sm">
            <Image className='' src="/BMW.svg" alt="BMW" height={0} width={25}/>
            {Brand}
          </h2>:
          <h2 className="mx-10 py-2 px-3 rounded-full flex items-center justify-center shadow-sm">{Brand}</h2>
        }
        <h2 className="py-3 px-10">{Model}</h2>
        <h2 className="py-3 px-10">{Year}</h2>
        <h2 className="py-3 px-10">{Price} $/hr</h2>
        </div>
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-around col-span-3 lg:col-span-2">
        <h2 className={`shadow-inner rounded-full py-3 px-10 font-bold shadow-black/10 flex gap-3 items-center ${cstatus=="Approved"?"justify-center shadow-green-300 text-green-600":cstatus=="Rejected"?"shadow-red-300 justify-center text-red-500":"shadow-sky-300 text-blue-600"}`}>
            {cstatus=="Panding"&&<span className="relative flex size-5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-5 rounded-full bg-sky-400"></span>
            </span>}
            {cstatus} 
        </h2>
        {cstatus=="Panding" ? 
        <div className="my-3 px-10 flex justify-between">
            <button onClick={()=>handleStatuschange("Approved")} className="bg-green-300/10 shadow-green-500/60">Approve</button>
            <button onClick={()=>handleStatuschange("Rejected")} className="bg-red-300/20 shadow-red-500/60">Reject</button>
        </div>:
        <div className="my-3 px-10">
            <button onClick={() => setEditdilog(prev => !prev)} className="text-[#2A4064] shadow-[#2A4064]/30 flex items-center gap-8">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2A4064"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#2A4064" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21 21H12" stroke="#2A4064" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            Edit
            </button>
            {editdilog &&
              <div className="fixed inset-0 z-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
                <div className="bg-white p-10 border rounded-xl w-full lg:w-1/2 shadow-lg">
                  <div className="flex justify-between">
                    <h3>Edit details</h3>
                    <Image onClick={() => setEditdilog(prev => !prev)} className='' src="/close.svg" alt="close" height={0} width={50}/>
                  </div>
                  <div className="grid grid-cols-2 gap-10 py-5">
                    <input
                      type="text"
                      className="rounded-xl border border-[#2A4064] py-3 px-5 text-2xl"
                      placeholder="Brand name"
                      value={cbrand}
                      onChange={(e)=> setBrand(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-xl border border-[#2A4064] py-3 px-5 text-2xl"
                      placeholder="Model name"
                      value={cmodel}
                      onChange={(e)=> setModel(e.target.value)}
                    />
                    <input
                      type="number"
                      className="rounded-xl border border-[#2A4064] py-3 px-5 text-2xl"
                      placeholder="Model name"
                      value={cprice}
                      onChange={(e)=> setPrice(Number(e.target.value))}
                    />
                    <input
                      type="number"
                      className="rounded-xl border border-[#2A4064] py-3 px-5 text-2xl"
                      placeholder="Model name"
                      value={cyear}
                      onChange={(e)=> setYear(Number(e.target.value))}
                    />
                    <select
                      className="rounded-xl border border-[#2A4064] py-3 px-5 text-2xl col-span-2"
                      value={cstatus}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Panding">Panding</option>
                    </select>
                  </div>
                  <div className="flex justify-around">
                    <h1 onClick={handleEdit} className="bg-[#2A4064] text-white hover:text-[#2A4064] hover:bg-white border border-[#2A4064] rounded-3xl">Update</h1>
                    <h1 onClick={() => setEditdilog(prev => !prev)} className="bg-[#2A4064] text-white hover:text-[#2A4064] hover:bg-white border border-[#2A4064] rounded-3xl">Cancel</h1>
                  </div>
                </div>
              </div>
            }
        </div>}
        </div>
    </div>
  )
}

export default ListRow
