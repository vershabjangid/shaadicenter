import React, { useState } from 'react'
import { Footer } from '../../../../common/Footer'
import { Header } from '../../../../common/Header'
import { Loader } from '../../../../common/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import { api, getCookie } from '../../../../url/Url'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

export function UpdateFamily() {
    let [loader, setloader] = useState(false)
    let location = useLocation();
    let data = location.state

    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Family_Values: data.Family_Values || "",
            Family_Type: data.Family_Type || "",
            Family_Status: data.Family_Status || "",
            Any_Disability: data.Any_Disability || "",
            No_Of_Children: data.No_Of_Children || "",
            Father_Name: data.Father_Name || "",
            Mother_Name: data.Mother_Name || "",
            Father_Designation: data.Father_Designation || "",
            Mother_Designation: data.Mother_Designation || "",
            No_Of_Sisters: data.No_Of_Sisters || "",
            No_Of_Brothers: data.No_Of_Brothers || ""
        },

        onSubmit: (value, { resetForm }) => {
            updatedata(formik.values)
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

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let updatedata = (value) => {
        try {
            api.put('/update-about-family', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader(false)
                        navigate(`/view-profile/${formik.values.Sub_id}`)

                    }
                    else {
                        notificationerror(res.data.Message)
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
                loader ? <Loader />
                    : <section className='main'>
                        <Header />
                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#ffffff]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>
                                {/* <h1 className='text-[23px]'>View Profile</h1> */}


                                <section className='w-[100%] my-[20px]  bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <form className='w-[100%]' onSubmit={formik.handleSubmit}>
                                            <p className='font-[800] text-[25px]'>Family Details</p>
                                            <div className='mt-[20px]'>
                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Family Values</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Family_Values', e.target.value)}
                                                        defaultValue={data.Family_Values}
                                                    >

                                                        <option>Select Family Values</option>
                                                        <option value="Orthodox">Orthodox</option>
                                                        <option value="Traditional">Traditional</option>
                                                        <option value="Moderate">Moderate</option>
                                                        <option value="Liberal">Liberal</option>
                                                    </select>
                                                </div>


                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Family Type</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Family_Type', e.target.value)}
                                                        defaultValue={data.Family_Type}
                                                    >
                                                        <option>Select Family Type</option>
                                                        <option value="Joint">Joint</option>
                                                        <option value="Nuclear">Nuclear</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div className='mb-[10px]'>



                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Family Status</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Family_Status', e.target.value)}
                                                        defaultValue={data.Family_Status}
                                                    >

                                                        <option>Select Family Status</option>
                                                        <option value="Middle Class">Middle Class</option>
                                                        <option value="Upper Middle Class">Upper Middle Class</option>
                                                        <option value="High Class">High Class</option>
                                                        <option value="Rich / Affulent">Rich / Affulent</option>
                                                    </select>
                                                </div>

                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Any Disablility</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Any_Disability', e.target.value)}
                                                        defaultValue={data.Any_Disability}
                                                    >

                                                        <option>Select Any Disablility</option>
                                                        <option value="None">None</option>
                                                        <option value="Physically Challenged">Physically Challenged</option>
                                                    </select>
                                                </div>

                                            </div>


                                            <div className=''>


                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>No of Children</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('No_Of_Children', e.target.value)}
                                                        defaultValue={data.No_Of_Children}
                                                    >

                                                        <option>Select Children</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="More Than 5">More Than 5</option>
                                                    </select>
                                                </div>

                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Father's Name</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Father_Name', e.target.value)}
                                                        defaultValue={data.Father_Name}
                                                    />

                                                </div>
                                            </div>


                                            <div className='mb-[10px]'>

                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Father's Designation</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Father_Designation', e.target.value)}
                                                        defaultValue={data.Father_Designation}
                                                    >

                                                        <option>Select Father's Designation</option>
                                                        <option value="Employeed">Employeed</option>
                                                        <option value="Business Man">Business Man</option>
                                                        <option value="Retired">Retired</option>
                                                        <option value="Not Employeed">Not Employeed</option>
                                                        <option value="Expired">Expired</option>
                                                    </select>
                                                </div>


                                                <div className='w-[100%] mb-[10px]'>
                                                    <label>Mother's Name</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Mother_Name', e.target.value)}
                                                        defaultValue={data.Mother_Name}
                                                    />

                                                </div>
                                            </div>



                                            <div className='mb-[10px]'>



                                                <div className='w-[100%]'>
                                                    <label>Mother's Designation</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Mother_Designation', e.target.value)}
                                                        defaultValue={data.Mother_Designation}
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



                                                <div className='w-[100%] my-[10px]'>
                                                    <label>No of Brothers</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('No_Of_Brothers', e.target.value)}
                                                        defaultValue={data.No_Of_Brothers}
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



                                            <div className='mb-[10px] '>
                                                <div className='w-[100%]'>
                                                    <label>No of Sisters</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('No_Of_Sisters', e.target.value)}
                                                        defaultValue={data.No_Of_Sisters}
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


                                            <button className='bg-[#ffae18] px-6 py-2 mt-2 rounded-[10px] text-white'>Save</button>
                                        </form>
                                    </section>
                                </section>
                            </section>

                        </section>
                        <Footer />
                    </section>
            }
        </>
    )
}
