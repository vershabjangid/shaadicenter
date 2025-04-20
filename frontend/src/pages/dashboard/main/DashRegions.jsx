import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { api, getCookie } from '../../../url/Url'
import { Loader } from '../../../common/Loader'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { Link, useNavigate } from 'react-router-dom'

export function DashRegions() {
    let [loader, setloader] = useState(false)


    let formik = useFormik({
        initialValues: {
            Country_Name: "",
            Country_Status: "",

            State_Name: "",
            Country_Name1: "",
            State_Status: "",

            District_Name: "",
            Country_Name2: "",
            State_Name1: "",
            District_Status: ""
        },
        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Country_Name: "",
                Country_Status: "",
                State_Name: "",
                Country_Name1: "",
                State_Status: "",
                District_Name: "",
                Country_Name2: "",
                State_Name1: "",
                District_Status: ""
            })
            setloader(true)
        }
    })

    let navigate = useNavigate();
    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let insertdata = (value) => {
        try {
            api.post('/add-regions', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        finalfetch();
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



    const allfetch = async (value) => {
        try {
            const [getallcountry, getactivecountry, getactivestate, getalldistrict] = await Promise.all([
                api.get('/view-all-country', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                }),
                api.get('/view-active-country'),
                api.get('/view-all-states', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                }),
                api.get('/view-all-districts', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                }),

            ])

            return {
                AllCountries: getallcountry.data,
                ActiveCountries: getactivecountry.data,
                AllStates: getactivestate.data,
                AllDistrict: getalldistrict.data
            }
        }
        catch (error) {
            console.log(error)
            navigate('/error')
        }
    }


    let [data, setdata] = useState({ AllCountries: [], ActiveCountries: [], AllStates: [], AllDistrict: [] })

    let finalfetch = () => {
        allfetch()
            .then((res) => {
                setdata(res)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }

    let [filterstate, setfilterstates] = useState([])
    let filterstates = (value) => {
        api.post('/view-active-states', { data: value })
            .then((res) => {
                setfilterstates(res.data)
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
            api.delete('/delete-regions', {
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
    console.log(data)
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

                        <section className='w-[100%] h-[calc(100vh-97px)]  flex justify-between'>
                            <DashboardSidebar />


                            <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#deeff6] p-3'>
                                <h1 className='text-[30px] font-[600]'>Regions</h1>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>ADD COUNTRY</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Country Name
                                                </label>
                                                <input type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Name', e.target.value)} />
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Status', e.target.value)}>
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
                                    <p className='text-[15px]'>ADD STATE</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    State Name
                                                </label>
                                                <input type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('State_Name', e.target.value)} />
                                            </section>


                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Country Name
                                                </label>
                                                <select type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Name1', e.target.value)} >
                                                    <option>Select Country</option>
                                                    {
                                                        data.ActiveCountries.length === 0 ? "No data found" : data.ActiveCountries.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
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
                                                <select className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('State_Status', e.target.value)}>
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
                                    <p className='text-[15px]'>ADD DISTRICT</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    District Name
                                                </label>
                                                <input type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('District_Name', e.target.value)} />
                                            </section>


                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Country Name
                                                </label>
                                                <select type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Name2', e.target.value) && filterstates(e.target.value)} >
                                                    <option>Select Country</option>
                                                    {
                                                        data.ActiveCountries.length === 0 ? "No data found" : data.ActiveCountries.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>
                                        </section>

                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    State Name
                                                </label>
                                                <select type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('State_Name1', e.target.value)} >
                                                    <option>Select State</option>
                                                    {
                                                        filterstate.length === 0 ? "No data found" : filterstate.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.State_Name}>{items.State_Name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('District_Status', e.target.value)}>
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
                                    <p className='text-[15px]'>View Country</p>

                                    {

                                        data.AllCountries.length === 0
                                            ?
                                            <div div className='text-center'>No Data Found</div> :
                                            <table className='w-[100%] border-[1px] my-[20px]'>
                                                <thead className='w-[100%]'>
                                                    <tr className='w-[100%]'>
                                                        <th className='w-[30%] border-[1px]'>Country Name</th>
                                                        <th className='w-[10%] border-[1px]'>Status</th>
                                                        <th className='w-[20%] border-[1px]'>Created At</th>
                                                        <th className='w-[20%] border-[1px]'>Update</th>
                                                        <th className='w-[20%] border-[1px]'>Delete</th>
                                                    </tr>
                                                </thead>

                                                {data.AllCountries.map((items, index) => {
                                                    return (
                                                        <tbody key={index}>
                                                            <tr className='w-[100%] text-center'>
                                                                <td className='w-[30%] border-[1px]'>{items.Country_Name}</td>
                                                                <td className='w-[10%] border-[1px]'>{items.Country_Status ? "Active" : "De-Active"}</td>
                                                                <td className='w-[20%] border-[1px]'>{items.createdAt.slice(0, 10)}</td>
                                                                <td className='w-[20%] border-[1px]'>
                                                                    <Link to={`/dash-update-regions/${items._id}/${items.Country_Name}/${items.Country_Status}`} className='bg-[skyblue] py-2 px-4 rounded-[10px] text-white my-2'>
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



                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>View States</p>

                                    {
                                        data.AllStates.length === 0 ?
                                            <div className='text-center'>No Data Found</div> :
                                            <table className='w-[100%] border-[1px] my-[20px]'>
                                                <thead className='w-[100%]'>
                                                    <tr className='w-[100%]'>
                                                        <th className='w-[30%] border-[1px]'>State Name</th>
                                                        <th className='w-[30%] border-[1px]'>Country Name</th>
                                                        <th className='w-[10%] border-[1px]'>Status</th>
                                                        <th className='w-[20%] border-[1px]'>Created At</th>
                                                        <th className='w-[20%] border-[1px] px-5'>Update</th>
                                                        <th className='w-[20%] border-[1px] px-5'>Delete</th>
                                                    </tr>
                                                </thead>

                                                {data.AllStates.map((items, index) => {
                                                    return (
                                                        <tbody key={index}>
                                                            <tr className='w-[100%] text-center'>
                                                                <td className='w-[30%] border-[1px]'>{items.State_Name}</td>
                                                                <td className='w-[30%] border-[1px]'>{items.Country_Name1}</td>
                                                                <td className='w-[10%] border-[1px]'>{items.State_Status ? "Active" : "De-Active"}</td>
                                                                <td className='w-[20%] border-[1px]'>{items.createdAt.slice(0, 10)}</td>
                                                                <td className='w-[20%] border-[1px] px-5'>
                                                                    <Link to={`/dash-update-regions/${items._id}/${items.State_Name}/${items.Country_Name1}/${items.State_Status}`} className='bg-[skyblue] py-2 px-4 rounded-[10px] text-white my-2'>
                                                                        Update
                                                                    </Link>
                                                                </td>
                                                                <td className='w-[20%] border-[1px] px-5'>
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

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>View Districts</p>

                                    {
                                        data.AllDistrict.length === 0 ?
                                            <div className='text-center'>No Data Found</div> :
                                            <table className='w-[100%] border-[1px] my-[20px]'>
                                                <thead className='w-[100%]'>
                                                    <tr className='w-[100%]'>
                                                        <th className='w-[20%] border-[1px]'>District Name</th>
                                                        <th className='w-[20%] border-[1px]'>Country Name</th>
                                                        <th className='w-[20%] border-[1px]'>State Name</th>
                                                        <th className='w-[10%] border-[1px]'>Status</th>
                                                        <th className='w-[20%] border-[1px]'>Created At</th>
                                                        <th className='w-[20%] border-[1px] px-[40px]'>Update</th>
                                                        <th className='w-[20%] border-[1px] px-[40px]'>Delete</th>
                                                    </tr>
                                                </thead>

                                                {data.AllDistrict.map((items, index) => {
                                                    return (
                                                        <tbody key={index}>
                                                            <tr className='w-[100%] text-center'>
                                                                <td className='w-[20%] border-[1px]'>{items.District_Name}</td>
                                                                <td className='w-[20%] border-[1px]'>{items.Country_Name2}</td>
                                                                <td className='w-[30%] border-[1px]'>{items.State_Name1}</td>
                                                                <td className='w-[10%] border-[1px]'>{items.District_Status ? "Active" : "De-Active"}</td>
                                                                <td className='w-[20%] border-[1px]'>{items.createdAt.slice(0, 10)}</td>
                                                                <td className='w-[20%] border-[1px]'>
                                                                    <Link to={`/dash-update-regions/${items._id}/${items.District_Name}/${items.Country_Name2}/${items.State_Name1}/${items.District_Status}`} className='bg-[skyblue] py-2 px-4 rounded-[10px] text-white my-2'>
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
