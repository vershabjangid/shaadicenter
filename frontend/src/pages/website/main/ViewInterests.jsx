import React, { useEffect, useState } from 'react'
import { Loader } from '../../../common/Loader'
import { Header } from '../../../common/Header'
import image from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import logo from '../../../images/Group 2.svg'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaCheck, FaEdit, FaHeart } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { Footer } from '../../../common/Footer'
import { TbUserHeart } from 'react-icons/tb'
import nointrest from '../../../images/chat-converstion.png'
export function ViewInterests() {
    let [loader, setloader] = useState(false)
    let navigate = useNavigate();

    let { UserName } = useParams()
    let [status, setstatus] = useState("All Received interests")

    let [data, setdata] = useState([])
    let userdata = (value) => {
        setloader(true)
        try {
            api.post('/user-intrests-data', { UserName: UserName, Permitted: value }, {
                headers: {
                    Authorization: getCookie('Registertoken')

                }
            })
                .then((res) => {
                    if (res.data.Status !== 404) {
                        setdata(res.data)
                        setloader(false)
                    }
                    else {
                        setdata([])
                        setloader(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setloader(false)
                    navigate('/error')
                })
        }
        catch (error) {
            console.log(error)
            navigate('/error')
        }
    }

    useEffect(() => {
        userdata("All")
    }, [])


    let [modal, setmodal] = useState(false)
    let [modaldata, setmodaldata] = useState(false)

    return (
        <>
            {
                modal ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#ffffffb6] z-[90] flex justify-center items-center'>
                        <section className='w-[50%] border-[3px] border-[#ff869a] bg-[#ffffff] rounded-[10px] p-4'>
                            <div className='text-[14px] mb-[20px] flex justify-between'>
                                <div className='w-[100px]'>
                                    <img src={logo} alt="" className='w-[100%]' />
                                </div>

                                <button className='profileshadow w-[30px] h-[30px] bg-[#ff869a] text-white rounded-[10px] flex justify-center items-center' onClick={()=>setmodal(false)}><FaXmark /></button>
                            </div>
                            <section className='text-[#ff869a]'>
                                <p className='font-[600] text-[18px] mb-2'>Username : {modaldata.ReceiverName === undefined ? "N/A" : <span className='text-black font-[400]'>{modaldata.ReceiverUserName}</span>}</p>
                                <p className='font-[600] text-[18px] mb-2'>Receiver Name : {modaldata.ReceiverName === undefined ? "N/A" : <span className='text-black font-[400]'>{modaldata.ReceiverName}</span>}</p>
                                <p className='font-[600] text-[18px] mb-2'>Receiver Message : {modaldata.ReceiverName === undefined ? "N/A" : <span className='text-black font-[400]'>{modaldata.Message}</span>}</p>
                                <p className='font-[600] text-[18px] mb-2'>Status : {modaldata.Permitted === undefined ? "N/A" : <span className='text-black font-[400]'>{modaldata.Permitted}</span>}</p>

                                <div className='text-[14px] mt-[20px] flex'>
                                    <button className='profileshadow flex items-center bg-[#ff869a] text-white py-3 px-4 rounded-[10px]'><FaHeart className='me-2' />Accept</button>
                                    <button className='profileshadow flex items-center white-[#ff869a] text-[#ff869a] py-3 px-4 rounded-[10px] ms-4'><FaXmark className='me-2' />Declined</button>
                                </div>
                            </section>
                        </section>
                    </section>
                    : ""
            }
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#ffffff]'>
                            <section className='w-[100%] p-3 py-[20px] m-auto rounded-[20px]'>
                                {/* <section className='bg-[#ffffff] p-4 rounded-[10px] mb-[10px]'>
                                    <h1 className='text-[23px] flex items-center'><TbUserHeart className='me-2' />Intrest</h1>
                                </section> */}
                                <section className='bg-[white] p-4 rounded-[10px] flex justify-between mb-[10px] border-[1px] border-[grey]'>
                                    <section className='w-[250px] rounded-[10px] pt-2' style={{ boxShadow: "0px 0px 5px grey" }}>
                                        <section className=' border-b-2 border-[grey] mx-2 mt-4 pb-2'>
                                            <div>
                                                <div className='font-[600] mb-5'>
                                                    Intrests Received
                                                </div>
                                            </div>
                                            <ul className='ms-3 leading-[35px]'>
                                                <li className='cursor-pointer' onClick={() => userdata("All") || setstatus("All Received interests")}>
                                                    All
                                                </li>
                                                <li className='cursor-pointer' onClick={() => userdata("Pending") || setstatus("All Pending interests")}>
                                                    Pending
                                                </li>
                                                <li className='cursor-pointer' onClick={() => userdata("Accepted") || setstatus("All Accepted interests")}>
                                                    Accepted / Replied
                                                </li>
                                                <li className='cursor-pointer' onClick={() => userdata("Declined") || setstatus("All Declined interests")}>
                                                    Declined
                                                </li>
                                            </ul>
                                        </section>


                                        <section className='w-[100%]  mx-2 pb-2'>
                                            <div>
                                                <div className='font-[600] my-5'>
                                                    Intrests Sent
                                                </div>
                                            </div>
                                            <ul className='ms-3 leading-[35px]'>
                                                <li className='cursor-pointer' onClick={() => userdata("AllSended") || setstatus("All Sended interests")}>
                                                    All
                                                </li>
                                                <li className='cursor-pointer' onClick={() => userdata("PendingSended") || setstatus("All Sended Pending interests")}>
                                                    Pending
                                                </li>
                                                <li className='cursor-pointer' onClick={() => userdata("AcceptedSended") || setstatus("All Sended Accepted interests")}>
                                                    Accepted / Replied
                                                </li>
                                                <li className='cursor-pointer' onClick={() => userdata("DeclinedSended") || setstatus("All Sended Declined interests")}>
                                                    Declined
                                                </li>
                                            </ul>
                                        </section>
                                    </section>
                                    <section className='w-[calc(100%-270px)] h-[430px] overflow-y-scroll'>
                                        <div className='px-3 py-4'>
                                            {
                                                status === "All Received interests" ?
                                                    <div>
                                                        <p className='font-[600] text-[20px] '>All Received interests</p>
                                                        <p className=' text-[16px]'>Interests and responses from members</p>
                                                    </div>
                                                    :
                                                    status === "All Pending interests" ?
                                                        <div>
                                                            <p className='font-[600] text-[20px] '>All Pending interests</p>
                                                            <p className=' text-[16px]'>Interests and responses from members</p>
                                                        </div>
                                                        : status === "All Declined interests" ?
                                                            <div>
                                                                <p className='font-[600] text-[20px] '>All Declined interests</p>
                                                                <p className=' text-[16px]'>Interests and responses from members</p>
                                                            </div> :
                                                            status === "All Accepted interests" ?
                                                                <div>
                                                                    <p className='font-[600] text-[20px] '>All Accepted interests</p>
                                                                    <p className=' text-[16px]'>Interests and responses from members</p>
                                                                </div>
                                                                :
                                                                status === "All Sended interests" ?
                                                                    <div>
                                                                        <p className='font-[600] text-[20px] '>All Sended interests</p>
                                                                        <p className=' text-[16px]'>Interests and responses from members</p>
                                                                    </div> :
                                                                    status === "All Sended Pending interests" ?
                                                                        <div>
                                                                            <p className='font-[600] text-[20px] '>All Sended Pending interests</p>
                                                                            <p className=' text-[16px]'>Interests and responses from members</p>
                                                                        </div>
                                                                        :
                                                                        status === "All Sended Accepted interests" ?
                                                                            <div>
                                                                                <p className='font-[600] text-[20px] '>All Sended Accepted interests</p>
                                                                                <p className=' text-[16px]'>Interests and responses from members</p>
                                                                            </div> :
                                                                            <div>
                                                                                <p className='font-[600] text-[20px] '>All Sended Declined interests</p>
                                                                                <p className=' text-[16px]'>Interests and responses from members</p>
                                                                            </div>
                                            }


                                        </div>

                                        <section className='w-[100%]'>
                                            {
                                                data.length === 0 ?
                                                    <div className='h-[100%] flex justify-center items-center flex-col mt-[70px]'>
                                                        <img src={nointrest} alt="" />
                                                        <p className=' font-[600]'>You have no interests/messages.</p>
                                                    </div> :

                                                    status === "All Received interests" || status === "All Pending interests" || status === "All Declined interests" || status === "All Accepted interests" ?
                                                        data.map((items, index) => {
                                                            return (
                                                                <section key={index} className='w-[100%] border-[1px] border-[#ff869a] p-2 bg-[white] rounded-[40px] flex justify-between items-center mb-[10px]'>
                                                                    <div className='flex items-center'>
                                                                        <div className='w-[50px] border-[1px] h-[50px] flex justify-center items-center rounded-[50%] text-[#ff869a] text-[25px] border-[pink]'>
                                                                            <TbUserHeart className='' />
                                                                        </div>


                                                                        <div className='mx-2'>
                                                                            <p>You have received a new interest from the {items.SenderName}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className='ms-2'>
                                                                        <button className='text-[#ffffff] bg-[#ff869a] px-3 h-[50px] rounded-[30px]'>View Interests</button>
                                                                    </div>
                                                                </section>

                                                            )
                                                        })
                                                        :
                                                        data.map((items, index) => {
                                                            return (
                                                                <section key={index} className='w-[100%] border-[1px] border-[#ff869a] p-2 bg-[white] rounded-[40px] flex justify-between items-center mb-[10px]'>
                                                                    <div className='flex items-center'>
                                                                        <div className='w-[50px] border-[1px] h-[50px] flex justify-center items-center rounded-[50%] text-[#ff869a] text-[25px] border-[pink]'>
                                                                            <TbUserHeart className='' />
                                                                        </div>


                                                                        <div className='mx-2'>
                                                                            <p>You sended a new interest to the {items.ReceiverName}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className='ms-2'>
                                                                        <button className='text-[#ffffff] bg-[#ff869a] px-3 h-[50px] rounded-[30px]' onClick={() => setmodal(true) || setmodaldata(items)}>View Interests</button>
                                                                    </div>
                                                                </section>

                                                            )
                                                        })

                                            }
                                        </section>
                                    </section>
                                </section>
                            </section>
                        </section>

                        <Footer />
                    </section >
            }
        </>
    )
}



// <section className='w-[calc(100%-270px)] border-[1px]'>
// <div className='px-3 py-4'>
//     <p className='font-[600] text-[20px] '>All interests received</p>
//     <p className=' text-[16px]'>Interests and responses from members</p>
// </div>
// <div className='h-[100%] flex justify-center items-center flex-col'>
//     <img src={nointrest} alt="" />
//     {/* <p className=' font-[600]'>You have no pending interests/messages.</p> */}
// </div>
// </section>