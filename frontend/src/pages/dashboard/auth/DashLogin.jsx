import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../url/Url'
import * as Yup from 'yup'
import { Loader } from '../../../common/Loader'
import login_banner from '../../../images/loginbanner1.png'
import toast, { Toaster } from 'react-hot-toast'
export function DashLogin() {

    let [loader, setloader] = useState(false)


    let formik = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },

        validationSchema: Yup.object().shape({
            Email: Yup.string().email("Invalid email").required('Email is required'),
            Password: Yup.string().required("Password is required")
        }),

        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)


            resetForm({
                Email: "",
                Password: ""
            })
        }
    })



    const notifysuccess = (success) => toast.success(success);
    const notifyerror = (error) => toast.error(error);
    let navigate = useNavigate();
    let insertdata = (value) => {
        try {
            api.post('/admin-login', value)
                .then((res) => {
                    if (res.data.Status === 1 && res.data.Token) {
                        document.cookie = `AdminToken=${res.data.Token}`;
                        notifysuccess(res.data.Message)
                        setloader(false)
                        navigate('/dashboard')
                    }
                    else {
                        notifyerror(res.data.Message)
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
            {loader ? <Loader /> :

                <>
                    <section className='login_main w-[100%] h-[100vh] flex'>
                        <section className='w-[50%] overflow-hidden'>
                            <img src={login_banner} alt="" className='w-[100%]' />
                        </section>
                        <section className='w-[50%]  flex justify-center items-center'>
                            <section className='admin_login w-[90%] p-4 rounded-[10px]'>
                                <section>
                                    <h1 className='text-[30px] font-[700]'>Welcome Back</h1>
                                    <p className='mt-[10px] text-[18px] text-[#494949]'>Login to continue your journey</p>
                                </section>


                                <section className='form_section w-[100%] mt-[20px]'>
                                    <form action="" onSubmit={formik.handleSubmit}>
                                        <div className='w-[100%] my-[10px]'>
                                            <label htmlFor="">Email Address</label>
                                            <input type="text" className='w-[100%] border-[1px] border-[grey] p-2 my-1 rounded-[7px]' placeholder='Enter your email' onChange={(e) => formik.setFieldValue('Email', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Email}
                                            </div>
                                        </div>

                                        <div className='my-[10px]'>
                                            <label htmlFor="">Password</label>
                                            <input type="text" className='w-[100%] border-[1px] border-[grey] p-2 my-1 rounded-[7px]' placeholder='Enter your password' onChange={(e) => formik.setFieldValue('Password', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Password}
                                            </div>
                                        </div>


                                        <div className='my-[10px]'>
                                            <button type="submit" className='w-[100%] border-[0px] p-2 py-3 my-1 rounded-[7px] bg-[#FF4B91] text-[white] text-[20px] font-[700]'>
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </section>
                        </section>
                    </section >
                    <Toaster />
                </>
            }
        </>
    )
}
