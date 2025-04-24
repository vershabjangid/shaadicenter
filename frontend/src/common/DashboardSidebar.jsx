import React from 'react'
import { Link } from 'react-router-dom'
import { sidebardata } from './sidebardata';

export function DashboardSidebar() {
    let sidebarcontent = sidebardata;
    return (
        <>
            <section className='sidebar w-[250px] h-[100%] overflow-y-scroll bg-[#ff3c00]'>
                {
                    sidebarcontent.map((items, index) => {
                        return (
                            <Link key={index} to={items.path} className='w-[100%] bg-[white] py-3 flex items-center justify-between'>
                                <section className='w-[20%] flex justify-center items-center text-[20px]'>
                                    {items.icon}
                                </section>
                                <section className='w-[100%] font-[600]'>
                                    {items.Name}
                                </section>
                            </Link>
                        )
                    })
                }
            </section>
        </>
    )
}
