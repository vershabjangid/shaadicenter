import React, { useState } from 'react'
import { api, getCookie } from '../../../../url/Url'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Loader } from '../../../../common/Loader'
import { Header } from '../../../../common/Header'
import { Footer } from '../../../../common/Footer'
import { FaFile } from 'react-icons/fa'
import { toFormData } from 'axios'

export function UpdateProfilePicture() {
    let [loader, setloader] = useState(false)
    let [imgname, setimgname] = useState("...........Upload Your Profile Picture")
    let location = useLocation();
    let data = location.state
    console.log(data)

    let formik = useFormik({
        initialValues: {
            _id: getCookie('User_Id'),
            Profile_Picture: ""
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
            api.put('/update-profile-picture', toFormData(value), {
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
                                            <p className='font-[800] text-[25px]'>Profile Picture</p>
                                            <div className='w-[100%]'>
                                                <label>Profile Photo<sup className='text-[red]'>*</sup></label>
                                                <div className='relative h-[100px] w-[100%] rounded-[10px]  border-[1px] bg-[#EAE8E8] outline-none'>
                                                    <input
                                                        type="file"
                                                        maxLength={1}
                                                        className='w-[100%] h-[100%] rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none absolute z-30 opacity-0'
                                                        onChange={(e) => formik.setFieldValue('Profile_Picture', e.target.files[0]) && setimgname(e.target.value)}
                                                    />

                                                    <div className='w-[100%] h-[100%] border-dashed border-[1px] bg-[#EAE8E8] rounded-[10px] border-[black] absolute top-[3px] z-0 flex justify-center items-center'>
                                                        <div className='flex justify-center items-center flex-col'>
                                                            <p className='text-center text-[20px]'> <FaFile /></p>
                                                            <p>{imgname.slice(11, 50)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Profile_Picture}</div>
                                            </div>
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
