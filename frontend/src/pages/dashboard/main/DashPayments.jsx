import React, { useEffect, useState } from 'react'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { FaUser, FaWallet } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { api, getCookie } from '../../../url/Url'

export function DashPayments() {
    let [data, setdata] = useState([])
    let [imgurl, setimgurl] = useState([])


    let navigate = useNavigate()
    let viewdata = () => {
        try {
            api.get('/view-payments', {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    setdata(res.data.viewdata)
                    setimgurl(res.data.imgurl)
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


    let fullinfonavigate = (value) => {
        navigate('/view-payments', { Data: value, imgurl: imgurl })
    }



    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />

                <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                    <DashboardSidebar />
                    <section className='dashboard_section w-[calc(100%-250px)] h-[100%] overflow-y-scroll  bg-[#eaf5fa] p-3'>
                        <section className=' text-[27px] font-[600]'>
                            <h1>Users</h1>
                        </section>

                        <section className='flex justify-between my-[20px]'>
                            <section className='valuecards w-[48%] p-2 rounded-[10px] bg-gradient-to-r from-red-400 to-black border-[1px] cursor-pointer'>
                                <div className='flex items-center justify-between text-[white]'>
                                    <p className='text-[20px] font-[600] text-[white]'>Total Payments</p>
                                    <FaWallet />
                                </div>
                                <div>
                                    <h1 className='text-[white] font-[700] text-[20px]'>{data.length === 0 ? 0 : data.length}</h1>
                                </div>
                            </section>
                        </section>

                        {
                            data.length === 0 ? <div className='text-center bg-[white] py-3'>No Data Found</div> :
                                <table className='w-[100%] bg-[white] p-2'>
                                    <thead className='w-[100%]'>
                                        <tr className=''>
                                            <th className='p-5 font-[600]'>User ID</th>
                                            <th className='p-5 font-[600]'>Package Name</th>
                                            <th className='p-5 font-[600]'>Package Price</th>
                                            <th className='p-5 font-[600]'>Transaction ID</th>
                                            <th className='p-5 font-[600]'>View Profile</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            data.map((items, index) => {
                                                return (
                                                    <tr key={index} className={index % 2 === 0 ? ' bg-blue-100 rounded-[20px] my-2 text-center' : ' bg-white rounded-[20px] my-2 text-center'}>
                                                        <td className='p-5'>{items.User_Id}</td>
                                                        <td className='p-5'>{items.PackageName}</td>
                                                        <td className='p-5'>{items.PackagePrice}</td>
                                                        <td className='p-5'>{items.TransactionID}</td>
                                                        <td className='p-5'>
                                                            <button className='bg-[skyblue] py-2 px-3 rounded-[10px] text-white' onClick={() => fullinfonavigate(items)}>
                                                                View Profile
                                                            </button>
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
            </section>
        </>
    )
}
