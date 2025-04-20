import React from 'react'
import { FaCopyright, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaYoutube } from 'react-icons/fa'
import { FaLocationPin, FaXTwitter } from 'react-icons/fa6'

export function Footer() {
    return (
        <>
            <footer className='p-3' style={{ backgroundColor: "#111827", color: "white" }}>
                <section className='p-[30px] flex justify-between flex-wrap'>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Shaadi Center</p>
                        <div className='flex justify-between text-[18px]'>
                            <p className='my-1'><FaInstagram /></p>
                            <p className='my-1'><FaFacebook /></p>
                            <p className='my-1'><FaXTwitter /></p>
                            <p className='my-1'><FaLinkedin /></p>
                            <p className='my-1'><FaYoutube /></p>
                        </div>
                    </section>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Quick Links</p>
                        <p className='my-1'>Home</p>
                        <p className='my-1'>About Us</p>
                        <p className='my-1'>Search</p>
                        <p className='my-1'>Blog</p>
                    </section>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Help & Support</p>
                        <p className='my-1'>Contact Us</p>
                        <p className='my-1'>Privacy Policy</p>
                        <p className='my-1'>Terms of Service</p>
                    </section>
                    <section className='m-5'>
                        <p className='font-[600] text-[20px]'>Contact Us</p>
                        <p className='flex items-end my-1'><FaEnvelope className='me-2' /> jangidvershab23@gmail.com</p>
                        <p className='flex items-end my-1'><FaPhoneAlt className='me-2' /> +91 9351858094</p>
                        <p className='flex items-end my-1'><FaLocationPin className='me-2' /> New York, NY 10001</p>
                    </section>
                </section>
                <section className=' border-t-2 border-[white] flex justify-center py-4 pt-5'>
                    <p className=' flex items-center'>© 2025 Shaadi Center. All rights reserved.</p>
                </section>
            </footer>
        </>
    )
}
