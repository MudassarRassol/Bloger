import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center  text-white  ' >
        <Image
        src={assets.logo_light}
        alt='Logo'
        width={120}
        height={120}
        />
        <p>
        &copy; 2025 Bloger. All rights reserved.
        </p>
            <div className='flex' >
                <Image
                src={assets.facebook_icon}
                alt='Facebook'
                width={40}
                />
                <Image
                src={assets.googleplus_icon}
                alt='Google Plus'
                width={40}
                />
                <Image
                src={assets.twitter_icon}
                alt='Twitter'
                width={40}
                />
            </div>
    </div>
  )
}

export default Footer