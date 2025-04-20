import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/Loader'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'

export function DashCaste() {

    let [loader, setloader] = useState(false)

    let formik = useFormik({
        initialValues: {
            Caste_Name: "",
            Religion: "",
            Status: ""
        },

        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Caste_Name: "",
                Religion: "",
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
            api.post('/add-caste', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        finalfetch()
                        setloader(false)
                    }
                    else {
                        if (res.data.Status === 404) {
                            navigate('/dash-login')
                        }
                        else {
                            notificationerror(res.data.Message)
                            setloader(false)
                        }
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


    let [caste, setcaste] = useState([])
    let [religions, setreligions] = useState([])


    let fetch = async () => {
        try {
            let [religiondata, castedata] = await Promise.all([
                api.get('/view-active-religions', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                }),
                api.get('/view-caste', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                })
            ])

            return {
                religionsdata: religiondata.data,
                castesdata: castedata.data
            }
        }
        catch (error) {
            console.log(error)
            navigate('/error')
        }
    }


    let finalfetch = () => {
        fetch()
            .then((res) => {
                setreligions(res.religionsdata)
                setcaste(res.castesdata)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    useEffect(() => {
        finalfetch()
    }, [])


    let [modal, setmodal] = useState(false);
    let [modaldata, setmodaldata] = useState("");


    let deletedata = (value) => {
        try {
            api.delete('/delete-caste', {
                data: value,
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        finalfetch()
                        setloader(false)
                        setmodal(false)
                    }
                    else {
                        if (res.data.Status === 404) {
                            navigate('/dash-login')
                        }
                        else {
                            notificationerror(res.data.Message)
                            setloader(false)
                            setmodal(false)
                        }
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
                loader ? <Loader /> :
                    <section className='dash_main w-[100%]'>
                        <DashboardHeader />

                        <section className='w-[100%] h-[calc(100vh-97px)] flex justify-between'>
                            <DashboardSidebar />
                            <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#deeff6] p-3'>
                                <h1 className='text-[30px] font-[600]'>Caste</h1>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>ADD CASTE</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Caste Name
                                                </label>
                                                <input type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Caste_Name', e.target.value)} />
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Religion Name
                                                </label>
                                                <select

                                                    maxLength={1}
                                                    className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]'
                                                    onChange={(e) => formik.setFieldValue('Religion', e.target.value)}
                                                >

                                                    <option value={0}>Select Religion</option>
                                                    {
                                                        religions.length === 0 ? "No data found" : religions.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.Religion_Name}>{items.Religion_Name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>
                                        </section>


                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>


                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Status', e.target.value)}>
                                                    <option>Choose Active Status</option>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>De-Active</option>
                                                </select>
                                            </section>
                                        </section>

                                        <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                                    </form>
                                </section>


                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>View Caste</p>

                                    {
                                        caste.length === 0 || caste === undefined ?
                                            <div className='text-center'>No Data Found</div> :
                                            <table className='w-[100%] border-[1px] my-[20px]'>
                                                <thead className='w-[100%]'>
                                                    <tr className='w-[100%]'>
                                                        <th className='w-[30%] border-[1px]'>Caste Name</th>
                                                        <th className='w-[30%] border-[1px]'>Religion</th>
                                                        <th className='w-[10%] border-[1px]'>Status</th>
                                                        <th className='w-[20%] border-[1px]'>Created At</th>
                                                        <th className='w-[20%] border-[1px]'>Update</th>
                                                        <th className='w-[20%] border-[1px]'>Delete</th>
                                                    </tr>
                                                </thead>

                                                {caste.map((items, index) => {
                                                    return (
                                                        <tbody key={index}>
                                                            <tr className='w-[100%] text-center'>
                                                                <td className='w-[30%] border-[1px]'>{items.Caste_Name}</td>
                                                                <td className='w-[10%] border-[1px]'>{items.Religion}</td>
                                                                <td className='w-[10%] border-[1px]'>{items.Status ? "Active" : "De-Active"}</td>
                                                                <td className='w-[20%] border-[1px]'>{items.createdAt.slice(0, 10)}</td>
                                                                <td className='w-[20%] border-[1px]'>
                                                                    <Link to={`/dash-update-caste/${items._id}/${items.Caste_Name}/${items.Religion}/${items.Status}`} className='bg-[skyblue] py-2 px-4 rounded-[10px] text-white my-2'>
                                                                        Update
                                                                    </Link>
                                                                </td>
                                                                <td className='w-[20%] border-[1px] px-4'>
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
                    </section>
            }
            <Toaster />
        </>
    )
}
