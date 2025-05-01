import React from 'react'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { useLocation } from 'react-router-dom'

export function DashViewProfile() {
    let location = useLocation();
    let data = location.state

    console.log(data)
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />

                <section className='w-[100%] h-[calc(100vh-97px)] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#eaf5fa] p-3'>
                        <section className='w-[100%] rounded-[10px] p-4 bg-[white]'>
                            <section className='w-[80%] p-3 py-[20px] bg-[white] m-auto rounded-[20px]'>

                                <section className='w-[100%] my-[20px] flex justify-between'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <p className='font-[800] text-[25px] uppercase'>{ }</p>
                                            <p className=' text-[16px] font-[600]'>{ }</p>
                                            <p className=' text-[16px] mt-[10px]'>{ }</p>
                                            <p className=' text-[16px] mt-[5px]'>{ }</p>
                                            <p className=' text-[16px] mt-[5px]'>{ }</p>
                                            <p className=' text-[16px] mt-[5px]'>{ }</p>
                                            <p className=' text-[16px] mt-[5px]'>{ }</p>
                                            <p className=' text-[16px] mt-[5px]'>{ }</p>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}
