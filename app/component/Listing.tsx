"use client"
import React, { useEffect, useState } from 'react'
import ListRow from './ListRow'
import Cars,{Rental} from '../data/rental'

interface FilterProps{
  filter:string;
}

const Listing = ({filter}:FilterProps) => {

  const [listings, setListings] = useState<Rental[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const query = filter && filter !== "All" ? `?status=${filter}` : "";
      const res = await fetch(`/api/listings${query}`);
      const data = await res.json();

      const items = data.items || data; 
      setListings(items);
    };

    fetchListings();
  }, [filter]);

  return (
    <div className="">
        <div className="hidden xl:grid grid-cols-7 shadow-md shadow-[#2A4064]/60 border-gray-400/20 border-2 rounded-2xl mb-5 py-3">
            <h1 className="">Brand</h1>
            <h1 className="">Model</h1>
            <h1 className="">Year</h1>
            <h1 className="">Price</h1>
            <h1 className="">Status</h1>
            <h1 className="col-span-2">Actions</h1>
        </div>
        {listings.map((list)=>(<ListRow key={list.id} {...list}/>))}
    </div>
  )
}

export default Listing
