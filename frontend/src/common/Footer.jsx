import React from 'react'
import { FaCopyright, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaYoutube } from 'react-icons/fa'
import { FaLocationPin, FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <>
            <footer className='p-3' style={{ backgroundColor: "#111827", color: "white" }}>
                <section className='p-[30px] flex justify-between flex-wrap'>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Shaadi Center</p>
                        <div className='flex justify-between text-[18px]'>
                            <a href='https://www.instagram.com/shadicenter009/' className='my-1'><FaInstagram /></a>
                            <p className='my-1'><FaFacebook /></p>
                            <p className='my-1'><FaXTwitter /></p>
                            <p className='my-1'><FaLinkedin /></p>
                            <p className='my-1'><FaYoutube /></p>
                        </div>
                    </section>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Quick Links</p>
                        <p><Link to={"/"} className='my-1'>Home</Link></p>
                        <p><Link to={"/about"} className='my-1'>About Us</Link></p>
                        <p><Link to={"/search"} className='my-1'>Search</Link></p>
                    </section>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Help & Support</p>
                        <p className='my-1'>Contact Us</p>
                        <p className='my-1'>Privacy Policy</p>
                        <p className='my-1'>Terms of Service</p>
                    </section>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Contact Us</p>
                        <p className='flex items-end my-1'><FaEnvelope className='me-2' /> shadichenter391@gmail.com</p>
                        <p className='flex items-end my-1'><FaPhoneAlt className='me-2' /> +91 8690242204</p>
                        <p className='flex items-end my-1'><FaLocationPin className='me-2' /> Aakliya circle, jodhpur, rajasthan</p>
                    </section>
                </section>

                <section className=' border-t-2 border-[white] flex justify-center py-4 pt-5'>
                    <p className=' flex items-center'>Developed By Secure World Tech.</p>
                </section>
            </footer>
        </>
    )
}
