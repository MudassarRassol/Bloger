import React from 'react'
import Image  from 'next/image'
import { assets } from '@/assets/assets'
import Link from 'next/link'
const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100' >
        <Link href={'/'} className='px-2 sm:pl-14 py-3 border border-black cursor-pointer' >
            <Image
            src={assets.logo}
            alt='logo'
            width={120}
            />
        </Link>
        <div className='w-28 sm:w-80 min-h-[92.3vh]  max-h-[100vh]  relative py-12 border border-black px-2 flex flex-col gap-3' >
            {/* <div className=' w-[50%] sm:w-[80%] absolute right-0 ' > */}
            <Link href='/admin/addProduct' className=' flex items-center border border-black gap-3 font-medium px-3 py-2  bg-white shadow-[-5px_5px_0px_#000000] ' >
                <Image
                src={assets.add_icon}
                alt='add_icon'
                width={20}
                />
                Add Blog
            </Link>
            <Link href='/admin/bloglist' className=' flex items-center border border-black gap-3 font-medium px-3 py-2  bg-white shadow-[-5px_5px_0px_#000000] ' >
                <Image
                src={assets.blog_icon}
                alt='add_icon'
                width={20}
                />
                Blog List
            </Link>
            <Link href='/admin/suscribe' className=' flex items-center border border-black gap-3 font-medium px-3 py-2  bg-white shadow-[-5px_5px_0px_#000000] whitespace-wrap ' >
                <Image
                src={assets.email_icon}
                alt='add_icon'
                width={20}
                />
                Sus  Email
            </Link>
            {/* </div> */}
        </div>
    </div>
  )
}

export default Sidebar