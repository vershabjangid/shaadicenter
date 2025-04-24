import React from 'react'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { DashAddAboutBanner } from './About Components/DashAddAboutBanner'
import { Link } from 'react-router-dom'
import { DashAddAboutParagraph } from './About Components/DashAddAboutParagraph'
import { DashAddSubParagraph } from './About Components/DashAddSubParagraph'

export function DashAbout() {
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />

                <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red] bg-[#deeff6] p-3'>
                        <section className='flex justify-between'>
                            <h1 className='text-[30px] font-[600] '>About</h1>
                            <Link to={"/about-layout"} className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white] z-[70]'>View layout</Link>
                        </section>

                        <DashAddAboutBanner />
                        <DashAddAboutParagraph />
                        <DashAddSubParagraph/>
                    </section>
                </section>
            </section>
        </>
    )
}
