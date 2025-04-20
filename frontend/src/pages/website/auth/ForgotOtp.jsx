import React from 'react'
import { useEffect, useRef, useState } from 'react'
import loginbanner from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import logo from '../../../images/Group 2.svg'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../url/Url'
import { Loader } from '../../../common/Loader'

export function ForgotOtp() {

    let [loader, setloader] = useState(false)


    let { Email } = useParams()


    const [seconds, setseconds] = useState(2);
    var timer;
    useEffect(() => {
        timer = setInterval(() => {
            if (seconds > 0) {
                setseconds(seconds - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    });




    const [inputs, setinputs] = useState(new Array(4).fill(""));
    let inputrefs = useRef([]);


    useEffect(() => {
        if (inputrefs.current[0]) {
            inputrefs.current[0].focus()
        }
    }, [])


    let handlechange = (e, index) => {
        let values = e.target.value;

        if (isNaN(values)) {
            return;

        }
        else {
            const newOtp = [...inputs];
            newOtp[index] = values;
            setinputs(newOtp);

            if (values && index < inputs.length - 1) {
                inputrefs.current[index + 1].focus();
            }
        }
    }


    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !inputs[index] && index > 0) {
            inputrefs.current[index - 1].focus();
        }
    };

    const notifysuccess = (success) => toast.success(success);
    const notifyerror = (error) => toast.error(error);
    const navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            Email: Email,
            OTP_Value: ""
        },

        onSubmit: () => {
            insertdata(formik.values)
            setloader(true)
        }
    })

    const insertdata = (value) => {
        try {
            let data = {
                Email: value.Email,
                OTP_Value: inputs[0] + inputs[1] + inputs[2] + inputs[3]
            }
            api.post('/verify-register', data)
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        setloader(false)
                        document.cookie = `Registertoken=${res.data.RegisterToken}`
                        document.cookie = `User_Id=${res.data.User_id}`
                        navigate(`/change-password/${res.data.RegisterToken}`)
                    }

                    else {
                        notifyerror(res.data.Message)
                        setloader(false)
                        setinputs(new Array(4).fill(""))
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




    const resendotp = () => {
        try {
            setloader(true)
            let values = {
                Email: Email
            }

            api.post('/resend-otp', values)
                .then((res) => {
                    if (res.data.Status === 1) {
                        setseconds(60)
                        notifysuccess(res.data.Message)
                        setloader(false)
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
                                <h1 className='text-[40px] italic font-[600]' style={{ fontFamily: "Cormorant Garamond" }}>OTP Verification</h1>
                                <p className='text-[15.5px] font-[600] w-[75%] m-auto'>We've sent a 4-digit code to your email <br className='otp_br' /> ( {Email} ). Please enter it below to verify.</p>
                            </section>


                            <section className='flex justify-center mt-[20px]'>
                                <form className='w-[80%]' onSubmit={formik.handleSubmit}>

                                    <div className='flex justify-between mb-[20px]'>
                                        {
                                            inputs.map((items, index) => {
                                                return (
                                                    <div key={index}>
                                                        <input
                                                            type="text"
                                                            value={items}
                                                            maxLength={1}
                                                            ref={(el) => inputrefs.current[index] = el}
                                                            onChange={(e) => handlechange(e, index)}
                                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                                            className='otp_inputs w-[80px] text-center h-[80px] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button type='submit' className='w-[100%] p-[10.5px] rounded-[8px]' style={{ backgroundColor: "#FF83D4", color: "#FFFF" }}>Verify</button>
                                    <div className='text-center my-3'>
                                        {
                                            seconds !== 0 ? `00:${seconds}` :
                                                <p className='text-center '>
                                                    Didn't receive OTP
                                                    <span className='w-[100%] font-[600] p-2 rounded-[10px] mt-[1px] cursor-pointer text-[#FF83D4]' onClick={resendotp}>
                                                        Resend
                                                    </span>
                                                </p>
                                        }

                                    </div>

                                </form>
                            </section>


                        </section>
                        <Toaster />
                    </section >
            }
        </>
    )
}
