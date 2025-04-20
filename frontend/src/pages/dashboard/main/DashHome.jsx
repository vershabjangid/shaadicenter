import React from 'react'
import { Link } from 'react-router-dom'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { Toaster } from 'react-hot-toast'
import { DashAddHomeBanner } from './Home Components/DashAddHomeBanner'
import DashAddHomeCounter from './Home Components/DashAddHomeCounter'

export function DashHome() {
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />
                <section className='w-[100%] h-[calc(100vh-97px)] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#deeff6] p-3'>
                        <section className='flex justify-between'>
                            <h1 className='text-[30px] font-[600]'>Home</h1>
                            <Link to={"/home-layout"} className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white] z-[70]'>View layout</Link>
                        </section>

                        <DashAddHomeBanner />
                        <DashAddHomeCounter />
                        {/*   <DashAddHomeWhyChoose />
                        <DashFeaturedProfile />
                        <DashHomeSuccessStories /> */}

                    </section>
                </section >
            </section >
            <Toaster />
        </>
    )
}
