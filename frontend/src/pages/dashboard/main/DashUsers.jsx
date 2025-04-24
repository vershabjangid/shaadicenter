import React, { useEffect, useState } from 'react'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { FaUser } from 'react-icons/fa'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export function DashUsers() {

    let [data, setdata] = useState([])
    let [filterdata, setfilterdata] = useState([])
    let [maledata, setmaledata] = useState([])
    let [femaledata, setfemaledata] = useState(0)
    let [Blockeddata, setBlockeddata] = useState(0)



    let navigate = useNavigate()
    let viewdata = () => {
        try {
            api.get('/view-admin-users', {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.viewregister.length !== 0 && res.data.profiledata.length !== 0) {
                        setdata(res.data.viewregister.filter((items) => items.Form_Status === 3))
                        setfilterdata(res.data)
                        setBlockeddata(res.data.viewregister.filter((items) => items.Permitted === "Blocked"))
                    }
                    else {
                        setdata([])
                    }
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/error')
                })
        }
        catch (error) {
            console.log(error)
            navigate('/error')

        }
    }


    useEffect(() => {
        viewdata()
    }, [])


    console.log(data)
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />

                <section className='w-[100%] h-[calc(100vh-97px)]  flex justify-between'>
                    <DashboardSidebar />
                    <section className='dashboard_section w-[calc(100%-250px)] h-[100%] overflow-y-scroll  bg-[#eaf5fa] p-3'>
                        <section className=' text-[27px] font-[600]'>
                            <h1>Users</h1>
                        </section>

                        <section className='flex justify-between my-[20px]'>
                            <section className='valuecards w-[48%] p-2 rounded-[10px] bg-gradient-to-r from-red-400 to-black border-[1px] cursor-pointer'>
                                <div className='flex items-center justify-between text-[white]'>
                                    <p className='text-[20px] font-[600] text-[white]'>Total Users</p>
                                    <FaUser />
                                </div>
                                <div>
                                    <h1 className='text-[white] font-[700] text-[20px]'>{data.length === 0 ? 0 : data.length}</h1>
                                </div>
                            </section>

                            <section className='valuecards w-[48%] p-2 rounded-[10px] bg-gradient-to-r from-purple-400 to-black border-[1px] cursor-pointer'>
                                <div className='flex items-center justify-between text-[white]'>
                                    <p className='text-[20px] font-[600] text-[white]'>Blocked Users</p>
                                    <FaUser />
                                </div>
                                <div>
                                    <h1 className='text-[white] font-[700] text-[20px]'>{Blockeddata === 0 ? 0 : Blockeddata.length}</h1>
                                </div>
                            </section>
                        </section>

                        {
                            data.length === 0 ? <div className='text-center bg-[white] py-3'>No Data Found</div> :
                                <table className='w-[100%] bg-[white] p-2'>
                                    <thead className='w-[100%]'>
                                        <tr className=''>
                                            <th className='p-5 font-[600]'>User Name</th>
                                            <th className='p-5 font-[600]'>Email</th>
                                            <th className='p-5 font-[600]'>Phone</th>
                                            <th className='p-5 font-[600]'>Status</th>
                                            <th className='p-5 font-[600]'>View Profile</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            data.map((items, index) => {
                                                return (
                                                    <tr key={index} className={index % 2 === 0 ? ' bg-blue-100 rounded-[20px] my-2 text-center' : ' bg-white rounded-[20px] my-2 text-center'}>
                                                        <td className='p-5'>{items.UserName}</td>
                                                        <td className='p-5'>{items.Email}</td>
                                                        <td className='p-5'>{items.Phone_No}</td>
                                                        <td className='p-5'>{items.Permitted === 'Accepted' ? <div className='py-2 rounded-[10px] text-white bg-[green]'>{items.Permitted}</div> : <div className='py-2 rounded-[10px] text-white bg-[red]'>{items.Permitted}</div>}</td>
                                                        <td className='p-5'>
                                                            <Link to={`/view-users-profile/${items._id}`} className='bg-[skyblue] py-2 px-3 rounded-[10px] text-white'>
                                                                View Profile
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                        }
                    </section>
                </section>
            </section >
            <Toaster />
        </>
    )
}
