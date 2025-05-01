import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Footer } from '../../../common/Footer'
import { Header } from '../../../common/Header'
import { Loader } from '../../../common/Loader'
import { FaPlus, FaUser } from 'react-icons/fa'
import { LuSend } from 'react-icons/lu'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import logo from '../../../images/mesagebanner.png'
import { useParams } from 'react-router-dom'
import { api, getCookie } from '../../../url/Url'
import { useFormik } from 'formik'
import { Plans } from './Plans'
export function ViewMessages() {
    let [loader, setloader] = useState(false)
    let { UserName } = useParams();

    let [profiledata, setprofiledata] = useState([])

    let viewdata = () => {
        try {
            api.post('/view-chat-user', { UserName: UserName }, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.length) {
                        setprofiledata([])
                    }
                    else {
                        setprofiledata(res.data)
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

    let [messagedata, setmessagedata] = useState([])
    let viewchats = (view) => {

        try {
            let data = {
                Sender: getCookie('UserName') && UserName,
                Receiver: UserName && getCookie('UserName')
            }
            console.log(data)
            api.post('/view-chats', data, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    setmessagedata(res.data.viewmessages)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }


    console.log(messagedata)
    useEffect(() => {
        viewdata();
        viewchats()
    }, [])



    let formik = useFormik({
        initialValues: {
            User_id: getCookie('User_Id'),
            Sender: "",
            Receiver: profiledata.UserName,
            Message: "",
            Check: ""
        },

        onSubmit: () => {
            formik.values.Receiver = profiledata.UserName
            insertmessage(formik.values)
        }
    })

    let insertmessage = (value) => {
        try {
            api.post('/send-messages', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        console.log(res.data)
                        viewdata()
                        viewchats()
                    }
                    else {
                        console.log(res.data)
                        viewdata()
                        viewchats()
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
            <Plans />
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[white]'></section>
                        <section className='w-[100%] py-[5px]  bg-[#ffffff]'>
                            <section className='w-[100%] py-[20px] m-auto'>

                                <section className='bg-[white] h-[600px]  flex justify-between mb-[10px] border-[1px] border-[grey]'>
                                    <section className='w-[400px] h-[100%] bg-[#ff869a]' style={{ borderLeft: "1px solid #ff869a" }}>
                                        <section className='w-[100%] h-[100%] overflow-y-scroll pb-2'>
                                            <div className='px-3 py-2 leading-[35px] text-[#ffffff] border-b-[2px] border-[#ffffff]'>
                                                <h1 className='cursor-pointer text-[25px] font-[500]'>
                                                    Chats
                                                </h1>
                                            </div>

                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>

                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>



                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                            <section className='px-2 mt-2'>
                                                <section className='px-3 py-2 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                    <div className='w-[45px] h-[45px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                        <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                            <FaUser className='mt-[10px]' />
                                                        </div>
                                                    </div>

                                                    <div className='ms-3'>
                                                        <p className='text-[black]'>
                                                            Full Name
                                                        </p>
                                                        <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p>
                                                    </div>
                                                </section>
                                            </section>


                                        </section>
                                    </section>

                                    <section className='w-[calc(100%-270px)] h-[100%]' >
                                        <section className='px-2 mt-2'>
                                            <section className='px-3 py-1 leading-[35px] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                <div className='w-[50px] h-[50px] rounded-[50%] border-[1px] bg-[#939393]  overflow-hidden'>
                                                    {
                                                        profiledata === undefined || profiledata.length ?
                                                            <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                                <FaUser className='mt-[10px]' />
                                                            </div>
                                                            :
                                                            <div className='w-[100%] h-[100%] text-[30px] rounded-[50%] text-[#adadad] flex justify-center items-end'>
                                                                <img src={profiledata.imgurl + profiledata.Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                            </div>
                                                    }
                                                </div>

                                                <div className='ms-3'>
                                                    <p className='text-[black]'>
                                                        {profiledata === undefined || profiledata.length === 0 ? "N/A" : profiledata.Full_Name}
                                                    </p>
                                                    {/* <p className='text-[#8e8e8e] mt-[-10px]'>Last Status</p> */}
                                                </div>
                                            </section>
                                        </section>

                                        <section className='w-[100%] h-[calc(100%-145px)] overflow-y-scroll bg-[#f0bbc4] relative' style={{ backgroundImage: `url(${logo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                                            {
                                                messagedata.map((items, index) => {
                                                    return (
                                                        items.Sender === UserName ?

                                                            <div className='w-[100%] py-2'>
                                                                <div className=' flex items-center ms-2'>
                                                                    <div className='flex items-end bg-[white] rounded-[5px]  px-2'>
                                                                        <div className=' text-[18px] text-[#fa5c76] font-[400]'>{items.Message} </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :

                                                            <div className='w-[100%] h-auto  p-2  justify-end flex items-end'>
                                                                <div className=' flex items-center ms-2'>
                                                                    <div className='flex items-end bg-[white] rounded-[5px]  px-2'>
                                                                        <div className=' text-[18px] text-[#fa5c76] font-[400] m-2'>{items.Message} </div>
                                                                        <div className='text-[#2290bb]'>
                                                                            <IoCheckmarkDoneOutline />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                    )
                                                })
                                            }








                                        </section>
                                        <form onSubmit={formik.handleSubmit} className='px-3 h-[80px] border-[1px] flex  justify-evenly items-center '>
                                            <section className='w-[92%] h-[100%] text-[#ff869a] bg-[white] rounded-[10px] flex items-center'>
                                                <div className=' w-[100%] h-[100%] flex items-center'>
                                                    <input type="text" className='border-[2px] border-[#ff869a] p-2 px-3 rounded-[50px] w-[100%]' placeholder='Type a message' onChange={(e) => formik.setFieldValue('Message', e.target.value)} />
                                                </div>
                                            </section>
                                            <section className='h-[100%] flex items-center'>
                                                <button type='submit' className='w-[45px] h-[45px] bg-[#ff869a] rounded-[50%]  text-[white] text-[25px] flex items-center justify-center pe-1 pt-1'>
                                                    <LuSend />
                                                </button>
                                            </section>
                                        </form>
                                    </section>
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
