import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Footer } from '../../../common/Footer'
import { Header } from '../../../common/Header'
import { Loader } from '../../../common/Loader'
import { useLocation } from 'react-router-dom'
import { FaHeartCircleCheck } from 'react-icons/fa6'

export function SuccessfullyIntrest() {
    let [loader, setloader] = useState(false)
    let location = useLocation();
    let data = location.state

    console.log(data)
    return (
        <>
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#fff1fd]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>


                                <section className='profileshadow bg-[#ffffff] p-4 rounded-[10px] mb-4'>

                                    <div className='m-auto w-[80%] text-center'>
                                        <FaHeartCircleCheck className='text-[70px] m-auto text-[#ff869a]' />
                                        <h1 className='text-[30px] font-[600] m-auto text-[#ff869a]'>Inerests Sended Succesfully</h1>
                                    </div>

                                    <p className='w-[80%] text-[18px] mt-[15px] m-auto'>
                                        Dear Mr/Ms {data.SenderName}

                                    </p>
                                    <p className='w-[80%] text-[18px] mt-[15px] m-auto'>
                                        Thank You for showing your interest in one of the www.shaadicenter.org member.
                                        Your Interest has been sent successfully.
                                        you will receive the response soon for your interest.
                                    </p>
                                    <p className='w-[80%] text-[18px] mt-[15px] m-auto'>
                                        you will receive the response soon for your interest.
                                    </p>
                                    <p className='w-[80%] text-[18px] mt-[15px] m-auto'>
                                        <span className='mt-[30px]'>Good Luck!</span>
                                    </p>
                                    <p className='w-[80%] text-[18px] mt-[15px] m-auto'>
                                        From
                                        <br />
                                        www.shaadicenter.org
                                    </p>
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
