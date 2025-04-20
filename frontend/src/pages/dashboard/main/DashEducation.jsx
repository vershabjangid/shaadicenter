import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '../../../common/Loader'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

export function DashEducation() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Education_Name: "",
            Status: ""
        },
        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Education_Name: "",
                Status: ""
            })
            setloader(true)
        }

    })


    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
     let navigate = useNavigate()
    let insertdata = (value) => {
        try {
            api.post('/add-education', value, {
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

    let [educationdata, seteducationdata] = useState([])
    let viewdata = (value) => {
        try {
            api.get('/view-education', {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    seteducationdata(res.data)
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



    let [modal, setmodal] = useState(false);
    let [modaldata, setmodaldata] = useState("");


    let deletedata = (value) => {
        try {
            api.delete('/delete-education', {
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

                    <section className='w-[100%] h-[calc(100vh-97px)] flex justify-between'>
                        <DashboardSidebar />
                        <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#deeff6] p-3'>
                            <h1 className='text-[30px] font-[600]'>Education</h1>

                            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>

                                {
                                    loader ? <Loader /> : <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                        <p className='text-[15px]'>ADD EDUCATION</p>

                                        <form onSubmit={formik.handleSubmit}>
                                            <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                                <section className='w-[48%]'>
                                                    <label htmlFor="">
                                                        Education Name
                                                    </label>
                                                    <input type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Education_Name', e.target.value)} />
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
                                }
                            </section>


                            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                <p className='text-[15px]'>View Education</p>

                                {
                                    educationdata.length === 0 ?
                                        <div className='text-center'>No Data Found</div> :
                                        <table className='w-[100%] border-[1px] my-[20px]'>
                                            <thead className='w-[100%]'>
                                                <tr className='w-[100%]'>
                                                    <th className='w-[30%] border-[1px]'>Education Name</th>
                                                    <th className='w-[10%] border-[1px]'>Status</th>
                                                    <th className='w-[20%] border-[1px]'>Created At</th>
                                                    <th className='w-[20%] border-[1px]'>Update</th>
                                                    <th className='w-[20%] border-[1px]'>Delete</th>
                                                </tr>
                                            </thead>

                                            {educationdata.map((items, index) => {
                                                console.log(items)
                                                return (
                                                    <tbody key={index}>
                                                        <tr className='w-[100%] text-center'>
                                                            <td className='w-[30%] border-[1px]'>{items.Education_Name}</td>
                                                            <td className='w-[10%] border-[1px]'>{items.Status}</td>
                                                            <td className='w-[20%] border-[1px]'>{items.createdAt.slice(0, 10)}</td>
                                                            <td className='w-[20%] border-[1px]'>
                                                                <Link className='bg-[skyblue] py-2 px-4 rounded-[10px] text-white my-2'
                                                                    to={`/dash-update-education/${items._id}/${items.Education_Name}/${items.Status}`}
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
