import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaFile, FaRupeeSign } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import paymentqr from '../../../images/WhatsApp Image 2025-05-01 at 07.30.22 (2).jpeg'
import { api, getCookie } from '../../../url/Url';
import toast, { Toaster } from 'react-hot-toast';
import { toFormData } from 'axios';
export function PaymentSummary() {
    let location = useLocation();
    let data = location.state
console.log(data)
    let [imgname, setimgname] = useState("...........Upload Payment Screenshot")

    let formik = useFormik({
        initialValues: {
            User_Id: getCookie("User_Id"),
            PackageName: data.PlanName,
            PackagePrice: data.Price,
            PackageValidity: data.Validity,
            TransactionID: "",
            PaymentScreenShot: ""
        },

        onSubmit: () => {
            formik.values.PackageName = data.PlanName
            formik.values.PackagePrice = data.Price
            formik.values.PackageValidity = data.Validity
            insertdata(formik.values)

        }
    })

    let notifysuccess = (success) => toast.success(success)
    let notifyerror = (error) => toast.error(error)

    let insertdata = (value) => {
        console.log(value)
        try {
            api.post('/payment', toFormData(value), {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                    }
                    else {
                        notifyerror(res.data.Message)
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
        <section className='w-[100%] h-[100vh] bg-[#ffd0d8]'>
            <div className='text-center py-[20px] text-[40px] font-[600] text-[black]'>
                <p className=''>Payment Summary</p>
            </div>
            <section className='w-[100%] flex justify-center '>
                <section className='w-[48%]'>
                    <p className='text-[25px] font-[500] mb-[20px]'>Plan Details</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label className='text-[18px] font-[400]'>Package Name</label>
                            <input defaultValue={data.PlanName} disabled="true" type="text" className='w-[100%] p-2 rounded-[10px] mt-[5px] bg-white' onLoad={(e) => formik.setFieldValue('PackageName', e.target.value)} />
                        </div>

                        <div className='my-[20px]'>
                            <label className='text-[18px] font-[400]'>Package Price</label>
                            <input defaultValue={`${data.Price}`} disabled="true" type="text" className='w-[100%] p-2 rounded-[10px] mt-[5px] bg-white' onLoad={(e) => formik.setFieldValue('PackagePrice', e.target.value)} />
                        </div>

                        <div className='my-[20px]'>
                            <label className='text-[18px] font-[400]'>Validity</label>
                            <input defaultValue={data.Validity} disabled="true" type="text" className='w-[100%] p-2 rounded-[10px] mt-[5px] bg-white' onLoad={(e) => formik.setFieldValue('PackageValidity', e.target.value)} />
                        </div>

                        <div className='my-[20px]'>
                            <label className='text-[18px] font-[400]'>Transaction ID</label>
                            <input type="text" className='w-[100%] p-2 rounded-[10px] mt-[5px] bg-white' onChange={(e) => formik.setFieldValue('TransactionID', e.target.value)} />
                        </div>

                        <div className='my-[20px]'>
                            <label className='text-[18px] font-[400]'>Upload Payment Screenshot</label>
                            <div className='relative h-[100px] w-[100%] rounded-[10px]  border-[1px] bg-[#ffffff] outline-none mt-[10px]'>
                                <input
                                    type="file"
                                    maxLength={1}
                                    className='w-[100%] h-[100%] rounded-[10px] border-[1px] bg-[#ffffff] outline-none absolute z-30 opacity-0'
                                    onChange={(e) => formik.setFieldValue('PaymentScreenShot', e.target.files[0]) && setimgname(e.target.value)}
                                />

                                <div className='w-[100%] h-[100%] border-dashed border-[1px] bg-[#ffffff] rounded-[10px] border-[black] absolute z-0 flex justify-center items-center'>
                                    <div className='flex justify-center items-center flex-col'>
                                        <p className='text-center text-[20px]'> <FaFile /></p>
                                        <p>{imgname.slice(11, 50)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <button className='w-[100%] bg-[#ff647e] py-2 text-white rounded-[10px]'>Submit</button>
                    </form>
                </section>
                <section className='w-[calc(45%-100px)] ms-[100px] flex justify-center items-center'>
                    <img src={paymentqr} alt="" className='w-[70%]' />
                </section>
            </section>
            <Toaster />
        </section>
    )
}
