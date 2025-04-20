import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '../../../common/Loader'
import loginbanner from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import logo from '../../../images/Group 2.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api, getCookie } from '../../../url/Url'
export function ChangePassword() {
    let [loader, setLoader] = useState(false)
    let { token } = useParams()
    console.log(token)

    let formik = useFormik({
        initialValues: {
            _id: getCookie('User_Id'),
            Password: "",
            Confirm_Password: ""
        },

        validationSchema: Yup.object().shape({
            Password: Yup.string().required('Password is required'),
            Confirm_Password: Yup.string().required('Confirm Password is required')
        }),

        onSubmit: ((values, { resetForm }) => {
            insertdata(formik.values)
            setLoader(true)
            resetForm({
                Email: "",
            })
        })

    })

    const notifysuccess = (success) => toast.success(success);
    const notifyerror = (error) => toast.error(error);
    const navigate = useNavigate()
    const insertdata = (value) => {
        try {
            api.put('/change-password', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        setLoader(false)
                        navigate('/sign-in')
                    }

                    else {
                        notifyerror(res.data.Message)
                        setLoader(false)
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
                    <section className='login_main flex justify-end items-center'
                        style={{ backgroundImage: `url(${loginbanner})`, width: "100%", height: "100vh", backgroundPosition: "top", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                    >
                        <section className='w-[550px] rounded-[30px] py-3 bg-[white] me-[30px]'>
                            <section className='flex justify-center'>
                                <img src={logo} alt="" className='w-[220px] mt-2' />
                            </section>

                            <section className='text-center my-[15px]'>
                                <h1 className='text-[40px] italic font-[600]' style={{ fontFamily: "Cormorant Garamond" }}>Change Password</h1>
                                <p className='text-[19px] font-[600]'>Please enter your new password.</p>
                            </section>


                            <section className='flex justify-center mt-[20px]'>
                                <form className='w-[80%]' onSubmit={formik.handleSubmit}>
                                    <input type="text" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px] ' placeholder='New Password*' onChange={(e) => formik.setFieldValue('Password', e.target.value)} />
                                    <div className='mb-[9px] mt-[2px] text-[red]'>
                                        {formik.errors.Password}
                                    </div>
                                    <input type="text" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px]' placeholder='Confirm Password*' onChange={(e) => formik.setFieldValue('Confirm_Password', e.target.value)} />
                                    <div className='mb-[9px] mt-[2px] text-[red]'>
                                        {formik.errors.Confirm_Password}
                                    </div>
                                    <button type='submit' className='w-[100%] p-[10.5px] rounded-[8px]' style={{ backgroundColor: "#FF83D4", color: "#FFFF" }}>Change Password</button>
                                </form>
                            </section>


                        </section>
                        <Toaster />
                    </section >
            }
        </>
    )
}
