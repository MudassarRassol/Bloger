    import React from 'react'
    import Image from 'next/image'
    import {assets} from '@/assets/assets'
    import Button from './Button'
    import Link from 'next/link'
    const Header = () => {
    return (
        <>
        <div className='px-5 py-5 md:px-12 ' >
            <div className=' flex items-center justify-between ' >
                <Link href='/' >
                <Image
                src={assets.logo}
                alt='Bloger Logo'
                width={100}
                className='w-[100px] sm-auto ' 
                />
                </Link>
                <div>
                <Link href={'/createblog'} >
                <Button text='Create Blog' image={assets.arrow} />
                </Link>
                <Link href='/admin/bloglist' className='  -z-50 ' >
                <Button text='Admin' />
                </Link>
                </div>
            </div>
        </div>
        </>
    )
    }

    export default Header