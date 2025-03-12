
"use client"

import React,{useState} from 'react'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [loading,setloading] = useState(false);
  
  const onsubmithandler=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email)
    setloading(true)
    const res = await axios.post('/api/email',formData)
    if(res.data.status === 400){
      toast.error(res.data.message)
      setloading(false)
    }
    if(res.data.status === 201) {
      toast.success('Subscribed successfully!')
      setEmail('')
      setloading(false)
    }
  }

  return (
    <div className='text-center my-8' >
      <ToastContainer theme="dark" />
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blog</h1>
        <p className=' mt-10 max-w-[740px] m-auto text-xs sm:text-base   '>
            Discover the latest blog posts, insights, and updates about web development, technology, and more.
        </p>
        <form action="" onSubmit={(e)=>onsubmithandler(e)} className='flex  justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-solid shadow-[-7px_7px_0px_#000000]   ' >
            <input type="email"  placeholder='Enter Your Email'  required  onChange={(e)=>setEmail(e.target.value)} value={email} className=' pl-4  w-full outline-none   ' />
            <button type='submit' className='px-8 py-3  hover:bg-black hover:text-white border-l-2 '  disabled={loading}  >
            {
              loading? 'Subscribing...' : 'Subscribe'
            }  
            </button> 
        </form>
    </div>
  )
}

export default HeroSection