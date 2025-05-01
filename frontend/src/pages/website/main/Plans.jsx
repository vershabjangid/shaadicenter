import React, { useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

export function Plans() {
    let [hidecomponent, sethidecomponent] = useState(true)

    let navigate = useNavigate();

    let bill = (value) => {
        navigate('/payment-summary', { state: value })
    }
    return (
        <>
            {
                hidecomponent ? <section className='w-[100%] h-[100%] bg-[white] fixed z-[9999] flex justify-center flex-col items-center overflow-y-scroll '>

                    <section className='mt-[150px]'>
                        <h1 className='font-[700] text-[35px]'>Membership Plans</h1>
                    </section>
                    <section className='w-[100%] h-[100%] flex justify-evenly flex-wrap py-[20px]'>
                        <section className="plans w-[350px] h-[310px] border-[2px] border-[#ff869a] rounded-[10px] overflow-hidden my-[20px]">
                            <section className='text-center bg-[#ff869a] py-2 text-[white] text-[17px] font-[500]'>
                                <p>CLASSIC GOLD</p>
                            </section>
                            <section className='w-[100%] pt-4'>
                                <ul className='ms-2  leading-10 font-[600]'>
                                    <li className='flex text-[35px] items-center'><FaRupeeSign /> 3500/ <sub className='flex text-[18px]'>90 days</sub> </li>
                                </ul>
                            </section>
                            <section className='w-[100%] py-4'>
                                <ul className='ms-2 text-[16px] leading-10 font-[600]'>
                                    <li>Send Personalized Messages To 40 Profiles</li>
                                    <li>View Unlimited Profiles</li>
                                    <li>SMS Alerts</li>
                                </ul>
                            </section>
                            <section className='p-2'>
                                <button className='w-[100%] py-2 rounded-[10px] text-[white] font-[600] bg-[#ff869a]' onClick={() => bill({
                                    PlanName: "CLASSIC GOLD",
                                    Price: "3500",
                                    Validity: "90 days"
                                })}>
                                    Pay Now
                                </button>
                            </section>
                        </section>
                        <section className="plans w-[350px] h-[310px] border-[2px] border-[#ff869a] rounded-[10px] overflow-hidden my-[20px]">
                            <section className='text-center bg-[#ff869a] py-2 text-[white] text-[17px] font-[500]'>
                                <p>CLASSIC PLATINUM</p>
                            </section>
                            <section className='w-[100%] pt-4'>
                                <ul className='ms-2  leading-10 font-[600]'>
                                    <li className='flex text-[35px] items-center'><FaRupeeSign /> 6500/ <sub className='flex text-[18px]'>180 days</sub> </li>

                                </ul>
                            </section>
                            <section className='w-[100%] py-4'>
                                <ul className='ms-2 text-[16px] leading-10 font-[600]'>
                                    <li>Send Personalized Messages To 90 Profiles</li>
                                    <li>View Unlimited Profiles</li>
                                    <li>SMS Alerts</li>
                                </ul>
                            </section>
                            <section className='p-2'>
                                <button className='w-[100%] py-2 rounded-[10px] text-[white] font-[600] bg-[#ff869a]'
                                    onClick={() => bill({
                                        PlanName: "CLASSIC PLATINUM",
                                        Price: "6500",
                                        Validity: "180 days"
                                    })}>
                                    Pay Now
                                </button>
                            </section>
                        </section>
                        <section className="plans w-[350px] h-[310px] border-[2px] border-[#ff869a] rounded-[10px] overflow-hidden my-[20px]">
                            <section className='text-center bg-[#ff869a] py-2 text-[white] text-[17px] font-[500]'>
                                <p>PARENTING  PLAN</p>
                            </section>
                            <section className='w-[100%] pt-4'>
                                <ul className='ms-2  leading-10 font-[600]'>
                                    <li className='flex text-[35px] items-center'><FaRupeeSign /> 15000/ <sub className='flex text-[18px]'>600 days</sub> </li>

                                </ul>
                            </section>

                            <section className='w-[100%] py-4'>
                                <ul className='ms-2 text-[16px] leading-10 font-[600]'>
                                    <li>Send Personalized Messages To 300 Profiles</li>
                                    <li>View Unlimited Profiles</li>
                                    <li>SMS Alerts</li>
                                </ul>
                            </section>
                            <section className='p-2'>
                                <button className='w-[100%] py-2 rounded-[10px] text-[white] font-[600] bg-[#ff869a]'
                                    onClick={() => bill({
                                        PlanName: "PARENTING  PLAN",
                                        Price: "15000",
                                        Validity: "600 days"
                                    })}
                                >
                                    Pay Now
                                </button>
                            </section>
                        </section>
                        <section className="plans w-[350px] h-[310px] border-[2px] border-[#ff869a] rounded-[10px] overflow-hidden my-[20px]">
                            <section className='text-center bg-[#ff869a] py-2 text-[white] text-[17px] font-[500]'>
                                <p>UNIQUE PLAN</p>
                            </section>
                            <section className='w-[100%] pt-4'>
                                <ul className='ms-2  leading-10 font-[600]'>
                                    <li className='flex text-[35px] items-center'><FaRupeeSign /> 25000/ <sub className='flex text-[18px]'>720 days</sub> </li>

                                </ul>
                            </section>
                            <section className='w-[100%] py-4'>
                                <ul className='ms-2 text-[16px] leading-10 font-[600]'>
                                    <li>Send Unlimited Personalized Messages </li>
                                    <li>View Unlimited Profiles</li>
                                    <li>SMS Alerts</li>
                                </ul>
                            </section>
                            <section className='p-2'>
                                <button className='w-[100%] py-2 rounded-[10px] text-[white] font-[600] bg-[#ff869a]'
                                    onClick={() => bill({
                                        PlanName: "UNIQUE PLAN",
                                        Price: "25000",
                                        Validity: "720 days"
                                    })}
                                >
                                    Pay Now
                                </button>
                            </section>
                        </section>
                    </section>
                </section> : null
            }
        </>
    )
}
