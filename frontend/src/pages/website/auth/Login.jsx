import React, { useState } from 'react'
// import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import loginbanner from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import logo from '../../../images/Group 2.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '../../../url/Url'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '../../../common/Loader'
export function Login() {

    let [loader, setLoader] = useState(false)
    // let [Eye, setEye] = useState(false)

    let formik = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },

        validationSchema: Yup.object().shape({
            Email: Yup.string().email("Invalid Email").required('Email is required'),
            Password: Yup.string().required('Password is required')
        }),

        onSubmit: ((values, { resetForm }) => {
            insertdata(formik.values)
            setLoader(true)
            resetForm({
                Email: "",
                Password: ""
            })
        })

    })


    let navigate = useNavigate();
    let notifysuccess = (success) => toast.success(success);
    let notifyerror = (error) => toast.error(error);
    let insertdata = (value) => {
        try {
            api.post('/login', value)
                .then((res) => {
                    if (res.data.Status === 1 && res.data.Form_Status >= 3) {
                        notifysuccess(res.data.Message)
                        console.log(res.data)
                        document.cookie = `Registertoken=${res.data.RegisterToken}`
                        document.cookie = `User_Id=${res.data.User_id}`
                        setLoader(false)
                        navigate('/')
                    }
                    else if (res.data.Status === 2) {
                        navigate(`/otp-verification/${res.data.Email}`)
                    }
                    else if (res.data.Form_Status === 0) {
                        document.cookie = `Registertoken=${res.data.RegisterToken}`
                        document.cookie = `User_Id=${res.data.User_id}`
                        navigate(`/professional-details/${res.data.User_id}`)
                    }

                    else if (res.data.Form_Status === 1) {
                        document.cookie = `Registertoken=${res.data.RegisterToken}`
                        document.cookie = `User_Id=${res.data.User_id}`
                        navigate(`/residential-details/${res.data.User_id}`)
                    }

                    else if (res.data.Form_Status === 2) {
                        document.cookie = `Registertoken=${res.data.RegisterToken}`
                        document.cookie = `User_Id=${res.data.User_id}`
                        navigate(`/family-details/${res.data.User_id}`)
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
                                            <h1 className='text-[40px] italic font-[600]' style={{ fontFamily: "Cormorant Garamond" }}>Sign In</h1>
                                            <p className='text-[19px] font-[600]'>Please enter your details to sign up.</p>
                                        </section>


                                        <section className='flex justify-center mt-[20px]'>
                                            <form className='w-[80%]' onSubmit={formik.handleSubmit}>
                                                <input type="text" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px] my-[9px]' placeholder='Email Address*' onChange={(e) => formik.setFieldValue('Email', e.target.value)} />
                                                <input type="text" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px] mb-[9px]' placeholder='Password*' onChange={(e) => formik.setFieldValue('Password', e.target.value)} />
                                                <p className='text-end mb-[10px]'> <Link to={"/forgot-password"} className='mb-[9px] text-end'>Forgot Password ?</Link></p>
                                                <button type='submit' className='w-[100%] p-[10.5px] rounded-[8px]' style={{ backgroundColor: "#FF83D4", color: "#FFFF" }}>Sign In</button>

                                            </form>
                                        </section>


                                        <section className='my-[10px] w-[80%] m-auto'>
                                            <p className=' text-center'>Doesn't have an account ? <Link to={"/sign-up"} className='font-[600]' style={{ color: "#FF83D4" }}> Sign up</Link></p>
                                        </section>
                                    </section>
                                    <Toaster />
                                </section >
                        }
                    </>
            }
        </>
    )
}
