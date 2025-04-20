import React from 'react'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'

export function Dashboard() {
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />

                <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red]'>

                    </section>
                </section>
            </section>
        </>
    )
}
