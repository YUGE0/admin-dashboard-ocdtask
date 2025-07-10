"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const page = () => {
    
    const router = useRouter();
    const[uname,setUname] = useState("");
    const[pass,setPass] = useState("");
    const[error,setError] = useState("");

    const handleLogin = async () =>{

        console.log("on click",uname,pass);
        
        const res = await fetch("/api/auth",{
            method: "POST",
            body: JSON.stringify({uname,pass}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        if (res.ok) {
          router.push('/');
        } else {
          const data = await res.json();
          setError(data.message || 'Login failed');
        }
    }
    
  return (
    <div className="grid grid-cols-2 lg:gap-10 lg:p-10 place-items-center">
        <Image className='hidden lg:flex w-full h-full mt-40' src="/car.svg" alt="car" height={100} width={100}/>
        <div className="grid gap-10 w-1/2 mt-52 lg:mt-0">
            {error&&<h1 className="text-red-400">{error}</h1>}
            <h3>Login</h3>
            <input
              type="text"
              className="rounded-2xl border border-[#2A4064]/20 shadow-[#2A4064]/50 shadow-md py-3 px-5 text-2xl"
              placeholder="User name"
              value={uname}
              onChange={(e)=> setUname(e.target.value)}
            />
            <input
              type="text"
              className="rounded-2xl border border-[#2A4064]/20 shadow-[#2A4064]/50 shadow-md py-3 px-5 text-2xl"
              placeholder="Password"
              value={pass}
              onChange={(e)=> setPass(e.target.value)}
            />
            <button onClick={handleLogin} className="text-[#2A4064] shadow-[#2A4064]">Login</button>
        </div>
    </div>
  )
}

export default page;
