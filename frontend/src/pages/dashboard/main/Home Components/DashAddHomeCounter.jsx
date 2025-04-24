import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { api, getCookie } from '../../../../url/Url'

export default function DashAddHomeCounter() {
    let formik = useFormik({
        initialValues: {
            Counter_Value: "",
            Counter_Title: ""
        },
        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let insertdata = (value) => {
        try {
            api.post('/add-homecounter', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                <p className='text-[15px]'>ADD HOME COUNTER</p>

                <form onSubmit={formik.handleSubmit}>
                    <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                        <section className='w-[48%]'>
                            <label htmlFor="">
                                Counter
                            </label>
                            <input type="text" className='w-[100%] rounded-[5px] p-[5px] outline-none border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Counter_Value', e.target.value)} />
                            <div className='text-[red]'>
                                {formik.errors.Background_Color}
                            </div>
                        </section>

                        <section className='w-[48%]'>
                            <label htmlFor="">
                                Counter Title
                            </label>
                            <input type="text" className='w-[100%] rounded-[5px] p-[5px] outline-none border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Counter_Title', e.target.value)} />
                            <div className='text-[red]'>
                                {formik.errors.Background_Color}
                            </div>
                        </section>

                    </section>



                    <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>

                </form>
            </section>
        </>
    )
}
