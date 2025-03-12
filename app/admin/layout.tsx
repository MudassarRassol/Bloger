import { ReactNode } from 'react';
import Sidebar from '@/components/Admincomponents/Sidebar';
import Image from 'next/image';
import { assets } from '@/assets/assets';
export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
        <div className='flex ' >
            <Sidebar />
            <div className='flex  flex-col w-full ' >
            <div className='flex items-center  justify-between w-full  py-3 max-h-[60px] px-12 border-b border-black  ' >
                <h1 className='text-2xl font-bold'>Admin Panel</h1>
                <Image
                src={assets.profile_icon}
                width={40}
                alt='Admin-Profile-Photo'
                />
            </div>    
            <div className='  h-[92.3vh] overflow-y-scroll   ' >
            {children}
            </div>
            </div>            
        </div>
        </>
    )
}