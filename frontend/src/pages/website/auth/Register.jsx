
import React, { useState } from 'react'
import loginbanner from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import logo from '../../../images/Group 2.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { api } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/Loader'

export function Register() {
    let [loader, setLoader] = useState(false)
    // let [Eye, setEye] = useState(false)

    let formik = useFormik({
        initialValues: {
            Email: "",
            Phone_No: "",
            Password: "",
        },

        validationSchema: Yup.object().shape({
            Email: Yup.string().email("Invalid Email").required('Email is required'),
            Phone_No: Yup.number().min(1000000000, 'Invalid Phone no').max(9999999999, 'Invalid Phone no').required('Phone no is required'),
            Password: Yup.string().required('Password is required'),
        }),

        onSubmit: ((values, { resetForm }) => {
            insertdata(formik.values)
            setLoader(true)
            resetForm({
                Email: "",
                Phone_No: "",
                Password: "",
            })
        })

    })


    let navigate = useNavigate();
    let notifysuccess = (success) => toast.success(success);
    let notifyerror = (error) => toast.error(error);
    let insertdata = (value) => {
        try {
            api.post('/register', value)
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        setLoader(false)
                        navigate(`/otp-verification/${value.Email}`)
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
                                <h1 className='text-[40px] italic font-[600]' style={{ fontFamily: "Cormorant Garamond" }}>Sign Up</h1>
                                <p className='text-[19px] font-[600]'>Please enter your details to sign up.</p>
                            </section>


                            <section className='flex justify-center mt-[20px]'>
                                <form className='w-[80%]' onSubmit={formik.handleSubmit}>
                                    <input type="text" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px]' placeholder='Email Address*' onChange={(e) => formik.setFieldValue('Email', e.target.value)} />
                                    <input type="number" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px] my-[9px]' placeholder='Phone Number*' onChange={(e) => formik.setFieldValue('Phone_No', e.target.value)} />
                                    <input type="text" className='w-[100%] border-[1px] border-[black] p-[10.5px] rounded-[8px] mb-[9px]' placeholder='Password*' onChange={(e) => formik.setFieldValue('Password', e.target.value)} />
                                    <button type='submit' className='w-[100%] p-[10.5px] rounded-[8px]' style={{ backgroundColor: "#FF83D4", color: "#FFFF" }}>Sign Up</button>
                                    <p className=' mt-2'>
                                        *By clicking sign up, I agree to the T&C and Privacy Policy
                                    </p>
                                </form>
                            </section>




                            <section className='my-[10px] w-[80%] m-auto'>
                                <p className=' text-center'>Already have an account ? <Link to={"/sign-in"} className='font-[600]' style={{ color: "#FF83D4" }}> Sign in</Link></p>
                            </section>


                        </section>
                        <Toaster />
                    </section >
            }
        </>
    )
}
