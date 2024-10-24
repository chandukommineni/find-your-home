import React, { useEffect } from "react";
import Card from "./Card";
import { toast } from "react-toastify";
import {useSelector} from "react-redux"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const Properties = () => {
  const {properties,loading}=useSelector((state)=>state.properties)
  const user=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const [searchResults,setSearchedResults]=useState("")
  const [searchInput,setSearchInput]=useState("")
  const searchHandler=async(e)=>{
    e.preventDefault()
    if (searchInput){
      try{
        const response=await axios.get(`http://localhost:3000/api/search/search?q=${searchInput}`)
        setSearchedResults(response.data)
        setSearchInput("")
      }
      catch{
        toast.error("No Properties Found")
      }
    }
    else{
     toast.error("Search Something")
    }
   
    
  }
  const inputHandler=(e)=>{
    setSearchInput(e.target.value)
  }
  useEffect(()=>{
    if (!user){
      navigate("/")
    }
  },[])
  return (
    <div className="flex flex-col items-center py-5">
      <h2 className="text-4xl ">All properties</h2>
      <h3 className=" py-5 text-2xl">Find Your Place to Leave Happpily</h3>
      <div className="w-[50%] my-4">
      <form className="max-w-md mx-auto" onSubmit={(e)=>searchHandler(e)}>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              value={searchInput}
              onChange={inputHandler}
              type="search" 
              id="default-search" 
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Search by Location,Amenities,Title,..." 
              
            />
            <button 
              type="submit" 
              className="text-white absolute end-2.5 bottom-2.5 bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Search
            </button>
          </div>
        </form>

          
      </div>
      <div className="flex flex-wrap justify-around gap-10 w-[90%]">
      {  searchResults ?  
        searchResults?.map((property,index)=>{
          return <Card data={property}/>
         })
         :
            !loading?
            properties?.map((property,index)=>{
                 return <Card data={property}/>
            })
            :
           <Spinner/>
           }
      </div>
    </div>
  )
};

export default Properties;
