import React, { useState } from 'react'
import { Loader } from '../../../../common/Loader'
import { Header } from '../../../../common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Footer } from '../../../../common/Footer'
import toast from 'react-hot-toast'
import { api, getCookie } from '../../../../url/Url'

export function UpdateMyself() {
    let [loader, setloader] = useState(false)

    let { _id, About } = useParams()

    let formik = useFormik({
        initialValues: {
            _id: getCookie('User_Id'),
            About_Myself: "" || About
        },

        onSubmit: () => {
            updatedata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let updatedata = (value) => {
        try {
            api.put('/update-about-myself', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader('false')
                        navigate(`/view-profile/${formik.values._id}`)

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
                loader ? <Loader />
                    : <section className='main'>
                        <Header />
                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#ffffff]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>
                                {/* <h1 className='text-[23px]'>View Profile</h1> */}


                                <section className='w-[100%] my-[20px]  bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <form className='w-[100%]' onSubmit={formik.handleSubmit}>
                                            <p className='font-[800] text-[25px]'>About Myself</p>
                                            <textarea type="text" defaultValue={About} className='w-[100%] p-2 rounded-[10px] mt-2' onChange={(e) => formik.setFieldValue('About_Myself', e.target.value)} />
                                            <button className='bg-[#ffae18] px-6 py-2 mt-2 rounded-[10px] text-white'>Save</button>
                                        </form>
                                    </section>
                                </section>
                            </section>

                        </section>
                        <Footer />
                    </section>
            }
        </>
    )
}
