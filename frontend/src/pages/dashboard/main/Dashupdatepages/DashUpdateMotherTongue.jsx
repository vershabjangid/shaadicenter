import React, { useState } from 'react'
import { Loader } from '../../../../common/Loader'
import { DashboardHeader } from '../../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../../common/DashboardSidebar'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { api, getCookie } from '../../../../url/Url'

export function DashUpdateMotherTongue() {

    let { _id, MotherTongueName, Status } = useParams()
    let [loader, setloader] = useState(false)

    let formik = useFormik({
        initialValues: {
            _id: _id,
            MotherTongue_Name: MotherTongueName || "",
            Status: Status || ""
        },

        onSubmit: (values, { resetForm }) => {
            updatedata(formik.values)
            resetForm({
                MotherTongue_Name: " ",
                Status: " "
            })
            setloader(true)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let updatedata = (value) => {
        try {
            api.put('/update-mothertongue', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader(false)
                        navigate('/dash-mothertongue')

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
                                <h1 className='text-[30px] font-[600]'>Mother Tongue</h1>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>UPDATE MOTHER TONGUE</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Mother Tongue Name
                                                </label>
                                                <input defaultValue={MotherTongueName} type="text" className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('MotherTongue_Name', e.target.value)} />
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
