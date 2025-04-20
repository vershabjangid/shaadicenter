import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/Loader'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'


export function DashOccupation() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Occupation_Name: "",
            Status: ""
        },
        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Occupation_Name: "",
                Status: ""
            })
            setloader(true)
        }

    })


    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let insertdata = (value) => {
        try {
            api.post('/add-occupation', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                        setloader(false)
                    }

                    else {
                        notificationerror(res.data.Message)
                        setloader(false)
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

    let [occupationdata, setoccupationdata] = useState([])
    let viewdata = (value) => {
        try {
            api.get('/view-occupation', {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    setoccupationdata(res.data)
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


    let navigate = useNavigate();
    let updatedata = (value) => {
        navigate('/update-occupation', { state: value })
    }


    let [modal, setmodal] = useState(false);
    let [modaldata, setmodaldata] = useState("");


    let deletedata = (value) => {
        try {
            api.delete('/delete-occupation', {
                data: value,
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                        setloader(false)
                        setmodal(false)
                    }
                    else {
                        notificationerror(res.data.Message)
                        setloader(false)
                        setmodal(false)
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

    return (
        <>
            {
                modal ? <section className='w-[100%] h-[100vh] fixed z-60 bg-[#ffffff98] top-0 left-0 flex justify-center items-center'>
                    <div className='w-[450px] border-[1px] border-[black] p-2 py-5 bg-[white] text-center rounded-[10px]'>
                        <p className='text-[22px]'>Are Your Sure?</p>
                        <div className='flex justify-evenly mt-[20px]'>
                            <button className='bg-[green] text-[white] px-5 py-3 rounded-[10px]' onClick={() => setmodal(false)}>
                                Decline
                            </button>

                            <button className='bg-[red] text-[white] px-5 py-3 rounded-[10px]' onClick={() => deletedata(modaldata)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </section> : null
            }
            {
                loader ? <Loader /> : <section className='dash_main w-[100%]'>
                    <DashboardHeader />

                    <section className='w-[100%] h-[calc(100vh-97px)]  flex justify-between'>
                        <DashboardSidebar />
                        <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#deeff6] p-3'>
                            <h1 className='text-[30px] font-[600]'>Occupation</h1>

                            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>ADD OCCUPATION</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Occupation Name
                                                </label>
                                                <input type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Occupation_Name', e.target.value)} />
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Status', e.target.value)}>
                                                    <option>Choose Active Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="De-Active">De-Active</option>
                                                </select>
                                            </section>
                                        </section>

                                        <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                                    </form>
                                </section>

                            </section>


                            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                <p className='text-[15px]'>View OCCUPATION</p>

                                {
                                    occupationdata.length === 0 ?
                                        <div className='text-center'>No Data Found</div> :
                                        <table className='w-[100%] border-[1px] my-[20px]'>
                                            <thead className='w-[100%]'>
                                                <tr className='w-[100%]'>
                                                    <th className='w-[30%] border-[1px]'>Occupation Name</th>
                                                    <th className='w-[10%] border-[1px]'>Status</th>
                                                    <th className='w-[20%] border-[1px]'>Created At</th>
                                                    <th className='w-[20%] border-[1px]'>Update</th>
                                                    <th className='w-[20%] border-[1px]'>Delete</th>
                                                </tr>
                                            </thead>

                                            {occupationdata.map((items, index) => {
                                                console.log(items)
                                                return (
                                                    <tbody key={index}>
                                                        <tr className='w-[100%] text-center'>
                                                            <td className='w-[30%] border-[1px]'>{items.Occupation_Name}</td>
                                                            <td className='w-[10%] border-[1px]'>{items.Status}</td>
                                                            <td className='w-[20%] border-[1px]'>{items.createdAt.slice(0, 10)}</td>
                                                            <td className='w-[20%] border-[1px]'>
                                                                <Link className='bg-[skyblue] py-2 px-4 rounded-[10px] text-white my-2'
                                                                    to={`/dash-update-occupation/${items._id}/${items.Occupation_Name}/${items.Status}`}
                                                                >
                                                                    Update
                                                                </Link>
                                                            </td>
                                                            <td className='w-[20%] border-[1px]'>
                                                                <button className='bg-[red] py-2 px-4 rounded-[10px] text-white my-2'
                                                                    onClick={() => setmodal(true) || setmodaldata(items)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                }
                            </section>
                        </section>
                    </section>
                </section >
            }
            <Toaster />
        </>
    )
}
