import React, { useEffect, useState } from 'react'
import logo from '../images/Group 2.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaSearch, FaUserEdit } from 'react-icons/fa'
import { FaChevronDown, FaXmark } from 'react-icons/fa6'
import { api, getCookie } from '../url/Url'
import { TbUserHeart, TbWorldSearch } from 'react-icons/tb'
import { FiBell, FiHelpCircle, FiHome, FiSettings } from 'react-icons/fi'
import { BsEnvelopeOpenHeart, BsExclamationCircle } from 'react-icons/bs'
import { LuClipboardCheck } from 'react-icons/lu'
import { MdOutlinePrivacyTip } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
export function Header() {

    let [megamenu, setmegamenu] = useState(false)

    let getcookie = getCookie('Registertoken')


    let navigate = useNavigate();
    let notifysuccess = (success) => toast.success(success);
    let notifyerror = (error) => toast.error(error);

    let [data, setdata] = useState([])

    let userdata = () => {
        try {
            api.post('/header-data', { _id: getCookie('User_Id') }, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    setdata(res.data)
                    console.log(res.data)
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


    useEffect(() => {
        userdata()
    }, [])

    let logout = (value) => {
        try {
            api.post('/logout', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        document.cookie = 'Registertoken' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = 'User_Id  ' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        navigate('/sign-in')
                    }
                    else {
                        notifyerror(res.data.Message)
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
            <header className='w-[100%] bg-[white] py-[10px] px-[10px] flex justify-between items-center fixed z-[10]'>
                <section className='logo w-[100px]'>
                    <img src={logo} alt="" className='w-[100%]' />
                </section>

                <nav className='options'>
                    <ul className='flex'>
                        <li><Link to={"/"} className='ms-[30px]'>Home</Link></li>
                        {
                            getcookie ? <li><Link to={"/search"} className='ms-[30px]'>Search</Link></li> : null}
                        <li><Link to={"/about"} className='ms-[30px]'>About Us</Link></li>
                        <li><Link className='ms-[30px]'>Contact US</Link></li>
                    </ul>
                </nav>

                <section className='header_btn text-[white] font-[600] flex items-center z-[10]'>
                    {
                        getcookie ?
                            <section className=' text-black me-[10px] relative' onClick={() => setmegamenu(!megamenu)}>
                                <section className='profile_section flex justify-center items-center'>
                                    <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                        <img src={data._imgurl ? `${data._imgurl}/${data.Profile_Picture}` : logo} alt="" className='w-[100%] h-[100%]' />
                                    </section>

                                    <section className='ms-2'><FaChevronDown /></section>
                                </section>
                            </section>
                            :

                            <section className='flex items-center z-[10]'>
                                <ul className='flex'>
                                    <Link to={"/sign-in"} className='border-[2px] border-[red] text-[red] py-[12px] px-[12px] rounded-[30px]'><span className=''>Sign In</span></Link>
                                    <Link to={"/sign-up"} className='border-[2px] border-[#e23f5a] text-[#e23f5a] py-[12px] px-[12px] rounded-[30px] mx-3'><span >Sign Up</span></Link>
                                </ul>

                                {
                                    getcookie ?
                                        <section className=' text-black me-[10px] relative' onClick={() => setmegamenu(!megamenu)}>
                                            <section className=' rounded-[50%]  flex justify-center items-center text-[25px]'>
                                                <section className='profile_section flex justify-center items-center'>
                                                    {
                                                        megamenu ? <FaXmark /> : <FaBars />
                                                    }
                                                </section>
                                            </section>
                                        </section>
                                        : null
                                }
                            </section>
                    }
                </section>
            </header>

            {
                megamenu ? <section className=' w-[100%] flex justify-end fixed top-[85px] z-[10]'>
                    <section className='responsive_magemenu h-[calc(100vh-85px)] bg-[white] w-[300px] px-2 overflow-y-scroll'>
                        {
                            getcookie ? <section className=' border-b-[2px] border-[#9b9b9b]'>
                                <section className=' flex justify-between items-center px-3 '>
                                    <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                        <img src={data._imgurl ? `${data._imgurl}/${data.Profile_Picture}` : logo} alt="" className='w-[100%] h-[100%]' />
                                    </section>

                                    <section className='w-[calc(100%-60px)]'>
                                        <p className='font-[700] text-[20px] ms-3'>{data.Full_Name ? data.Full_Name : "No data Found"}</p>
                                        <p className='text-[14px] text-[grey] ms-3'>{data.UserName ? data.UserName : "No data Found"}</p>
                                    </section>
                                </section>

                                <section className=''>
                                    <Link to={`/view-profile/${getCookie('User_Id')}`}>
                                        <button className='w-[100%] h-[40px] my-2 border-[1px] border-[grey] rounded-[10px]'>View Profile</button>
                                    </Link>
                                </section>
                            </section>



                                : <section className=' flex justify-between items-center  border-b-[2px] border-[#9b9b9b]'>
                                    <section className='w-[100%]'>
                                        <div className='py-[5px] '><div className='bg-[red] py-[12px] rounded-[10px] text-center text-[white]'><Link to={"/sign-in"} className=''>Sign In</Link></div></div>
                                        <div className='py-[5px] '><div className='bg-[#e23f5a] py-[12px] rounded-[10px] text-center text-[white]'><Link to={"/sign-up"}>Sign Up</Link></div></div>

                                    </section>
                                </section>
                        }
                        <Link to={"/"} className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                            <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                <FiHome className='text-[30px]' />
                            </section>

                            <section className='w-[calc(100%-60px)]'>
                                <p className='text-[14px] text text-[grey] ms-3'>Home</p>
                            </section>
                        </Link>




                        {
                            getcookie ? <Link to={'/search'} className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                                <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                    <FaSearch className='text-[30px]' />
                                </section>

                                <section className='w-[calc(100%-60px)]'>
                                    <p className='text-[14px] text text-[grey] ms-3'>Search</p>
                                </section>
                            </Link>
                                : null}


                        <Link to={"/about"} className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                            <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                <BsExclamationCircle className='text-[30px]' />
                            </section>

                            <section className='w-[calc(100%-60px)]'>
                                <p className='text-[14px] text text-[grey] ms-3'>About Us</p>
                            </section>
                        </Link>


                        {
                            getcookie ?
                                <>

                                    <Link to={`/interests/${data.UserName}`} className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                                        <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                            <TbUserHeart className='text-[30px]' />
                                        </section>

                                        <section className='w-[calc(100%-60px)]'>
                                            <p className='text-[14px] text text-[grey] text-start ms-3'>Interests</p>
                                        </section>
                                    </Link>

                                </>
                                :
                                null
                        }

{
                            getcookie ?
                                <>

                                    <Link to={`/view-messages/${data.UserName}`} className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                                        <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                            <BsEnvelopeOpenHeart  className='text-[30px]' />
                                        </section>

                                        <section className='w-[calc(100%-60px)]'>
                                            <p className='text-[14px] text text-[grey] text-start ms-3'>Messages</p>
                                        </section>
                                    </Link>

                                </>
                                :
                                null
                        }



                        <section className=' flex justify-between items-center px-3 mt-[20px] mb-[10px]'>
                            <section className='w-[calc(100%-60px)]'>
                                <p className='text-[16.5px] text text-[black] font-[700] text-start ms-3'>Support & Feedback</p>
                            </section>
                        </section>

                        {
                            getcookie ? <section className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                                <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                    <FiSettings className='text-[30px]' />
                                </section>

                                <section className='w-[calc(100%-60px)]'>
                                    <p className='text-[14px] text text-[grey] ms-3'>Settings</p>
                                </section>
                            </section> : null
                        }

                        <section className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                            <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                <FiHelpCircle className='text-[30px]' />
                            </section>

                            <section className='w-[calc(100%-60px)]'>
                                <p className='text-[14px] text text-[grey] ms-3'>Help & Contact Us</p>
                            </section>
                        </section>



                        <section className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                            <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                <LuClipboardCheck className='text-[30px]' />
                            </section>

                            <section className='w-[calc(100%-60px)]'>
                                <p className='text-[14px] text text-[grey] ms-3'>Terms & Conditions</p>
                            </section>
                        </section>


                        <section className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]'>
                            <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                <MdOutlinePrivacyTip className='text-[30px]' />
                            </section>

                            <section className='w-[calc(100%-60px)]'>
                                <p className='text-[14px] text text-[grey] ms-3'>Privacy Policy</p>
                            </section>
                        </section>



                        {
                            getcookie ? <section className=' flex justify-between items-center px-3 border-b-[2px] border-[#9b9b9b]' onClick={() => logout()}>
                                <section className=' w-[60px] h-[60px] overflow-hidden rounded-[50%]  flex justify-center items-center'>
                                    <BiLogOut className='text-[30px]' />
                                </section>

                                <section className='w-[calc(100%-60px)]'>
                                    <p className='text-[14px] text text-[grey] ms-3'>Logout</p>
                                </section>
                            </section> : null
                        }

                    </section>
                </section> : null
            }
            <Toaster />
        </>
    )
}
