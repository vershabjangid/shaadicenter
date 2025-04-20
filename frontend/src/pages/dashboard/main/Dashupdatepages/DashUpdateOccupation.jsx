import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { api, getCookie } from '../../../../url/Url';
import { Loader } from '../../../../common/Loader';
import { DashboardHeader } from '../../../../common/DashboardHeader';
import { DashboardSidebar } from '../../../../common/DashboardSidebar';


export function DashUpdateOccupation() {
    let [loader, setloader] = useState(false);

    let { _id, OccupationName, Status } = useParams()

    let formik = useFormik({
        initialValues: {
            _id: _id,
            Occupation_Name: OccupationName || "",
            Status: Status || ""
        },

        onSubmit: () => {
            updatedata(formik.values)
            setloader(true)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let updatedata = (value) => {
        try {
            api.put('/update-occupation', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader('false')
                        navigate('/dash-occupation')

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

    return (
        <>
            {
                loader ? <Loader /> : <section className='dash_main w-[100%]'>
                    <DashboardHeader />

                    <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                        <DashboardSidebar />
                        <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red] bg-[#deeff6] p-3'>
                            <h1 className='text-[30px] font-[600]'>Religions</h1>

                            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>

                                {
                                    loader ? <Loader /> : <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                        <p className='text-[15px]'>Update Occupation</p>

                                        <form onSubmit={formik.handleSubmit}>
                                            <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                                <section className='w-[48%]'>
                                                    <label htmlFor="">
                                                        Occupation Name
                                                    </label>
                                                    <input type="text" defaultValue={OccupationName} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Occupation_Name', e.target.value)} />
                                                </section>

                                                <section className='w-[48%]'>
                                                    <label htmlFor="">
                                                        Status
                                                    </label>
                                                    <select defaultValue={Status} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Status', e.target.value)}>
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
                        </section>
                    </section>
                </section >
            }
            <Toaster />
        </>
    )
}
