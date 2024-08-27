import React, { useEffect } from "react";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Card from "./Card";
import AboutUs from "./AboutUS"
import ContactForm from "./ContactForm";
import {fetchProperties} from "../store/popertiesSlice"
import { useDispatch } from "react-redux";
const Home = () => {
    const user=useSelector((state)=>state.user)
    const {properties,loading}=useSelector((state)=>state.properties)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        if (!user){
            navigate("/")
       }
       
    },[])
    useEffect(()=>{
      
      dispatch(fetchProperties())
     
    },[])

    
   
  return (
    <>
    <Carousel/>
    <div className="flex flex-col w-full items-center my-9 gap-5">
        <h1 className="text-3xl font-bold ">
          Check our <span className="text-green-500 text-4xl">Properties</span> 
        </h1>
        <div className="w-full flex items-center justify-around">
        
           {
            !loading?
            properties?.slice(0,4).map((property,index)=>{
                 return <Card data={property}/>
            })
            :
            <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-success opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
           }
        </div>
        
        <button onClick={()=>navigate("/properties")} className="w-[9rem] h-[3rem] bg-green-500 rounded-lg font-semibold text-white">View All</button>
        
    </div>
    <AboutUs/>
    <ContactForm/>
    </>
  )
};

export default Home;
