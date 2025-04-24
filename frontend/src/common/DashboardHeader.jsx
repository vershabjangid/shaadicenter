import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import logo from '../images/Group 2.svg'
export function DashboardHeader() {

    let [megamenu, setmegamenu] = useState(false)

    let navigate = useNavigate();
    const removeCookie = (key) => {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log(`Cookie '${key}' removed`);
        navigate('/')
    };
    return (
        <>
            <header className='w-[100%] p-[10px] flex justify-between items-center bg-[white]'>
                <section>
                    <img src={logo} alt="" className='w-[120px]' />
                </section>
                <section>
                    <section className='relative'>
                        <section className='w-[70px] h-[70px] rounded-[50%] overflow-hidden bg-[grey] flex justify-center items-end cursor-pointer' onClick={() => setmegamenu(!megamenu)}>
                            <FaUser className='text-[50px] text-[white]' />
                        </section>

                        {
                            megamenu ? <section className='w-[300px] absolute bg-[white] p-2 right-0 top-[120%] border-[1px] border-[black]'>
                                <section className='flex justify-between items-center py-2' onClick={() => removeCookie('AdminToken')}>
                                    <p className='text-[20px] font-[600]' >Logout</p>
                                    <IoLogOut className='text-[35px]' />
                                </section>
                            </section> : null
                        }
                    </section>
                </section>
            </header>
        </>
    )
}
