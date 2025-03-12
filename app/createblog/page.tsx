
"use client"

import { assets } from '@/assets/assets'
import Button from '@/components/Button'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import {ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'
const Page = () => {

  const [image, setImage] = useState<File | null>(null)
  const [data, setdata] = useState(
    {
      title: '',
      description: '',
      category: '',
      author_img: '/profile_icon.png',
      author: ''
    }
  )


  const onchangehandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }))
    console.log(data)
  }

  const onsubmithandeler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('image', image as File)
    formData.append('title', data.title)
    formData.append('author', data.author)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author_img', data.author_img)

    const response = await axios.post('/api/blog', formData);
    if(response.data.success){
      toast.success(response.data.msg)
      setImage(null);
      setdata({
        title: '',
        description: '',
        category: '',
        author_img: '/profile_icon.png',
        author: ''
      })
    }
    else{
      toast.error("Error To Adding Blog")
    }

  }

  return (
    <>
    <ToastContainer theme="dark" />
    <Link href="/" className="absolute top-2  right-3 fixed">
        <Button text="Go Back" />
      </Link>
      <form className='pt-5 px-5 sm:pt-8 sm:pl-10 max-w-[700px] ' >
        <p className='text-xl md:text-2xl' >Upload thumbnail</p>
        <label htmlFor="image" className=' cursor-pointer  ' >
          <Image
            className='mt-4'
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt='Upload Area'
            width={140}
            height={70}
          />
        </label>
        <input onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
          }
        }} type="file" id="image" name="" hidden required className='hidden w-auto' />
        <p className=' text-xl mt-4 ' >Blog Title</p>
        <input type="text" onChange={onchangehandler} placeholder='Type here title...' name='title' value={data.title} required className='w-full sm-w-[500px] mt-4 px-4 py-3 border border-black' />
        <p className=' text-xl mt-4 ' >Author Name</p>
        <input type="text" onChange={onchangehandler} placeholder='Type here Author Name...' name='author' value={data.author} required className='w-full sm-w-[500px] mt-4 px-4 py-3 border border-black' />
        <p className=' text-xl mt-4 ' >Blog Description</p>
        <textarea onChange={onchangehandler} placeholder='Type here Content...' name='description' value={data.description} required rows={10} className='w-full   sm-w-[500px] mt-4 px-4 py-3 border border-black' />
        <p className=' text-xl mt-4 ' >Blog Category</p>
        <select
          name="category"
          value={data.category}
          onChange={onchangehandler}
          className='mt-4 mb-4 px-8 py-3  border border-black ' >
          <option value="" className=' ' >Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Startup">Startup</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
          <Button text='Submit' type='submit' func={(e) => {onsubmithandeler(e)}} />
        <br />
      </form>
    </>
  )
}

export default Page