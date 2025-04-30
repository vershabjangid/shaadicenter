import React, { useEffect, useState } from 'react'
import { Footer } from '../../../common/Footer'
import { Loader } from '../../../common/Loader'
import { Header } from '../../../common/Header'
import { FaHeart } from 'react-icons/fa'
import { data, useNavigate, useParams } from 'react-router-dom'
import { api, getCookie } from '../../../url/Url'
import toast, { Toaster } from 'react-hot-toast'

export function SendIntrest() {
    let [loader, setloader] = useState(false)
    let [intrestdata, setintrestdata] = useState("I liked your profile and would like to connect with you. Please respond if you are interested.")
    let { Receiver_id } = useParams();

    let [finaluserdata, setdata] = useState([])
    let getdata = () => {
        try {
            let data = {
                User_id: getCookie('User_Id'),
                ReceiverUserName: Receiver_id
            }
            api.post('/get-username', data, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    setdata(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getdata();
    }, [])

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();
    let insertdata = (value) => {
        let finaldata = {
            SenderName: value.SenderFullUserName,
            SenderUserName: value.SenderUserName,
            ReceiverName: value.ReceiverFullUserName,
            ReceiverUserName: value.ReceiverUserName,
            Message: intrestdata
        }

        try {

            api.post('/send-interest', finaldata, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }

            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        navigate('/success-send-intrest', { state: finaldata })
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#fff1fd]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>
                                <section className='profileshadow bg-[#ffffff] p-4 rounded-[10px] mb-4 '>
                                    <h1 className='text-[23px] text-[#ff869a] font-[600] flex items-center '><FaHeart className='me-2' />Send Interests</h1>
                                </section>


                                <section className='profileshadow bg-[#ffffff] p-4 rounded-[10px] mb-4'>
                                    <p className='text-[25px]'>
                                        Heart beats for {finaluserdata.ReceiverFullUserName}.
                                    </p>
                                    <p className='text-[18px] mt-[10px]'>
                                        You can send free interest to members and get notified instantly when they accept or decline your request.
                                    </p>
                                </section>

                                <section className='profileshadow bg-[#ffffff] p-4 rounded-[10px] mb-4'>
                                    <p className='text-[20px]'>
                                        I am interested in {Receiver_id}
                                    </p>


                                    <div className='mt-[35px] flex text-[20px]'>
                                        <input type="checkbox" className='me-2' checked={intrestdata === "I liked your profile and would like to connect with you. Please respond if you are interested." ? true : false} onClick={() => setintrestdata("I liked your profile and would like to connect with you. Please respond if you are interested.")} />
                                        <p>I liked your profile and would like to connect with you. Please respond if you are interested.</p>
                                    </div>

                                    <div className='mt-[35px] flex text-[20px]'>
                                        <input type="checkbox" className='me-2' checked={intrestdata === "I am genuinely interested in your profile. Kindly contact me if you feel the same." ? true : false} onClick={() => setintrestdata("I am genuinely interested in your profile. Kindly contact me if you feel the same.")} />
                                        <p>I am genuinely interested in your profile. Kindly contact me if you feel the same.</p>
                                    </div>


                                    <div className='mt-[35px] flex text-[20px]'>
                                        <input type="checkbox" className='me-2' checked={intrestdata === "I feel we could be a great match. Please reach out to take things forward." ? true : false} onClick={() => setintrestdata("I feel we could be a great match. Please reach out to take things forward.")} />
                                        <p>I feel we could be a great match. Please reach out to take things forward.</p>
                                    </div>


                                    <div className='mt-[35px] flex text-[20px]'>
                                        <input type="checkbox" className='me-2' checked={intrestdata === "Your profile seems perfect to me. Let's connect and explore this further." ? true : false} onClick={() => setintrestdata("Your profile seems perfect to me. Let's connect and explore this further.")} />
                                        <p>Your profile seems perfect to me. Let's connect and explore this further.</p>
                                    </div>


                                    <p className='text-[20px] mt-[35px]'>
                                        My Username is : {finaluserdata.SenderUserName}
                                    </p>



                                    <div className='text-[20px] mt-[35px]'>
                                        <button onClick={() => insertdata(finaluserdata)} className='profileshadow flex items-center bg-[#ff869a] text-white py-3 px-4 rounded-[10px]'><FaHeart className='me-2' />Send Interest</button>
                                    </div>


                                </section>
                            </section>



                        </section>

                        <Footer />
                        <Toaster />
                    </section >
            }
        </>
    )
}
