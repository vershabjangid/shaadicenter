import React, { useState } from 'react'
import { Loader } from '../../../../common/Loader'
import { DashboardHeader } from '../../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../../common/DashboardSidebar'
import toast, { Toaster } from 'react-hot-toast'
import { api, getCookie } from '../../../../url/Url'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'

export function DashUpdateReligion() {

    let [loader, setloader] = useState(false)
    let { _id, ReligionName, Status } = useParams();

    let formik = useFormik({
        initialValues: {
            _id: _id,
            Religion_Name: ReligionName || "",
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
            api.put('/update-religions', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader(false)
                        navigate('/dash-religions')

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
                loader ? <Loader /> :




                    <section className='dash_main w-[100%]'>
                        <DashboardHeader />

                        <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                            <DashboardSidebar />
                            <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red] bg-[#deeff6] p-3'>
                                <h1 className='text-[30px] font-[600]'>Religions</h1>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>UPDATE RELIGIONS</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Religion Name
                                                </label>
                                                <input defaultValue={ReligionName} type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Religion_Name', e.target.value)} />
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select defaultValue={Status === 'true' ? 1 : 0} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Status', e.target.value)}>
                                                    <option>Choose Active Status</option>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>De-Active</option>
                                                </select>
                                            </section>
                                        </section>

                                        <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                                    </form>
                                </section>
                            </section>
                        </section>
                    </section>
            }
            <Toaster />
        </>
    )
}
