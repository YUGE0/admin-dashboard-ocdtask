"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const Logout = () => {
  
  const router = useRouter()

  const handleLogout = async () =>{
    console.log("Logout clicked");
    
     await fetch('/api/auth', {
      method: 'DELETE',
    });

    router.push('/Login');
  }

  return (
    <button onClick={handleLogout} className="m-10 w-full shadow-[#2A4064]">Logout</button>
  )
}

export default Logout
