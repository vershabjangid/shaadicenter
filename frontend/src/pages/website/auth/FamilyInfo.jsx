import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import logo from '../../../images/Group 2.svg'
import { useNavigate } from 'react-router-dom'
import { toFormData } from 'axios'
import { api, getCookie } from '../../../url/Url'
import { Loader } from '../../../common/Loader'

export function FamilyInfo() {

    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Family_Values: "",
            Family_Type: "",
            Family_Status: "",
            Any_Disability: "",
            No_Of_Children: "",
            Father_Name: "",
            Mother_Name: "",
            Father_Designation: "",
            Mother_Designation: "",
            No_Of_Sisters: "",
            No_Of_Brothers: ""
        },
        onSubmit: (valus, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Family_Values: "",
                Family_Type: "",
                Family_Status: "",
                Any_Disability: "",
                No_Of_Children: "",
                Father_Name: "",
                Mother_Name: "",
                Father_Designation: "",
                Mother_Designation: "",
                No_Of_Sisters: "",
                No_Of_Brothers: ""
            })
        }

    })

    const notifysuccess = (success) => toast.success(success);
    const notifyerror = (error) => toast.error(error);
    const navigate = useNavigate();
    let insertdata = (values) => {
        try {
            api.post('/add-family', values, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        navigate('/sign-in')
                        setloader(false)

                    }
                    else {
                        notifyerror(res.data.Message)
                        setloader(false)
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
            {
                loader ? <Loader /> :
                    <section className='login_main w-[100%] h-[100vh] font-[Poppins] flex '>
                        <section className='login_banner_form w-[100%] text-center overflow-y-scroll'>
                            <img src={logo} alt="" className='w-[250px] m-auto mt-[20px]' />
                            <h1 className='font-[700] mt-[10px] text-[50px]'>Family Information</h1>
                            <p className='mt-[5px] font-[500]'></p>
                            <section className='w-[80%] m-auto mt-[20px]'>
                                <form action="" className='text-start' onSubmit={formik.handleSubmit}>
                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>Family Values</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Family_Values', e.target.value)}
                                            >

                                                <option>Select Family Values</option>
                                                <option value="Orthodox">Orthodox</option>
                                                <option value="Traditional">Traditional</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Liberal">Liberal</option>
                                            </select>
                                        </div>


                                        <div className='w-[49%]'>
                                            <label>Family Type</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Family_Type', e.target.value)}
                                            >
                                                <option>Select Family Type</option>
                                                <option value="Joint">Joint</option>
                                                <option value="Nuclear">Nuclear</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className='mb-[10px] flex justify-between'>



                                        <div className='w-[49%]'>
                                            <label>Family Status</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Family_Status', e.target.value)}
                                            >

                                                <option>Select Family Status</option>
                                                <option value="Middle Class">Middle Class</option>
                                                <option value="Upper Middle Class">Upper Middle Class</option>
                                                <option value="High Class">High Class</option>
                                                <option value="Rich / Affulent">Rich / Affulent</option>
                                            </select>
                                        </div>

                                        <div className='w-[49%]'>
                                            <label>Any Disablility</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Any_Disability', e.target.value)}
                                            >

                                                <option>Select Any Disablility</option>
                                                <option value="None">None</option>
                                                <option value="Physically Challenged">Physically Challenged</option>
                                            </select>
                                        </div>

                                    </div>


                                    <div className='mb-[10px] flex justify-between'>


                                        <div className='w-[49%]'>
                                            <label>No of Children</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('No_Of_Children', e.target.value)}
                                            >

                                                <option>Select Children</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="More Than 5">More Than 5</option>
                                            </select>
                                        </div>

                                        <div className='w-[49%]'>
                                            <label>Father's Name</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Father_Name', e.target.value)}
                                            />

                                        </div>
                                    </div>


                                    <div className='mb-[10px] flex justify-between'>

                                        <div className='w-[49%]'>
                                            <label>Father's Designation</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Father_Designation', e.target.value)}
                                            >

                                                <option>Select Father's Designation</option>
                                                <option value="Employeed">Employeed</option>
                                                <option value="Business Man">Business Man</option>
                                                <option value="Retired">Retired</option>
                                                <option value="Not Employeed">Not Employeed</option>
                                                <option value="Expired">Expired</option>
                                            </select>
                                        </div>


                                        <div className='w-[49%]'>
                                            <label>Mother's Name</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Mother_Name', e.target.value)}
                                            />

                                        </div>
                                    </div>



                                    <div className='mb-[10px] flex justify-between'>



                                        <div className='w-[49%]'>
                                            <label>Mother's Designation</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Mother_Designation', e.target.value)}
                                            >

                                                <option>Select Mother's Designation</option>
                                                <option value="Employeed">Employeed</option>
                                                <option value="Business Woman">Business Woman</option>
                                                <option value="Retired">Retired</option>
                                                <option value="Not Employeed">Not Employeed</option>
                                                <option value="House Wife">House Wife</option>
                                                <option value="Expired">Expired</option>
                                            </select>
                                        </div>



                                        <div className='w-[49%]'>
                                            <label>No of Brothers</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('No_Of_Brothers', e.target.value)}
                                            >

                                                <option>Select Brothers</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="5+">5+</option>
                                            </select>
                                        </div>
                                    </div>



                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>No of Sisters</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('No_Of_Sisters', e.target.value)}
                                            >

                                                <option>Select Sisters</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="5+">5+</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className='mb-[10px]'>
                                        <div className=''>
                                            <button type="submit" className='w-[100%]  p-2 text-[white]  py-3 rounded-[10px] mt-[3px] border-[1px] outline-none bg-[red]'>
                                                Submit
                                            </button>

                                        </div>
                                    </div>
                                </form>
                            </section>
                        </section>

                    </section>
            }
            <Toaster />
        </>
    )
}
