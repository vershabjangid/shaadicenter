import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '../../../common/Loader'
import { FaFile } from 'react-icons/fa'
import { api, getCookie } from '../../../url/Url'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toFormData } from 'axios'
import logo from '../../../images/Group 2.svg'
export function ResidentialDetails() {


    let [loader, setloader] = useState(false)
    let [imgname, setimgname] = useState("...........Upload Your Profile Picture")
    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Country: "",
            State: "",
            District: "",
            Address: "",
            Citizenship: "",
            Address_Proof: ""
        },
        onSubmit: (valus, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Country: "",
                State: "",
                District: "",
                Address: "",
                Citizenship: "",
                Address_Proof: ""
            })
        }
    })

    const notifysuccess = (success) => toast.success(success);
    const notifyerror = (error) => toast.error(error);
    const navigate = useNavigate();
    let insertdata = (values) => {
        try {
            api.post('/add-residential', toFormData(values), {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        navigate(`/family-details/${getCookie('User_Id  ')}`)
                        setloader(false)
                    }
                    else {
                        notifyerror(res.data.Message)
                        setloader(false)
                        setimgname("...........Upload Your Profile Picture")
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


    let [filterstate, setfilterstates] = useState([])
    let filterstates = (value) => {
        api.post('/view-active-states', { data: value })
            .then((res) => {
                setfilterstates(res.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    let [filterdistrict, setfilterdistrict] = useState([])
    let filterdistricts = (value) => {
        console.log(value)
        api.post('/view-active-districts', { data: value })
            .then((res) => {
                setfilterdistrict(res.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    let [countrydata, setcountrydata] = useState([])
    let viewcountry = () => {
        try {
            api.get('/view-active-country')
                .then((res) => {
                    setcountrydata(res.data)
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
        viewcountry()
    }, [])

    return (
        <>
            {
                loader ? <Loader /> :
                    <section className='login_main w-[100%] h-[100vh] font-[Poppins] flex '>
                        <section className='login_banner_form w-[100%] text-center overflow-y-scroll'>
                            <img src={logo} alt="" className='w-[250px] m-auto mt-[20px]' />
                            <h1 className='font-[700] mt-[10px] text-[50px]'>Residential Information</h1>
                            <p className='mt-[5px] font-[500]'></p>
                            <section className='w-[80%] m-auto mt-[20px]'>
                                <form action="" className='text-start' onSubmit={formik.handleSubmit}>
                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>Country</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Country', e.target.value) && filterstates(e.target.value)}
                                            >

                                                <option>Select Country</option>
                                                {
                                                    countrydata.length === 0 ? "No data found" : countrydata.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>



                                        <div className='w-[49%]'>
                                            <label>State</label>
                                            <select
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('State', e.target.value) && filterdistricts(e.target.value)}
                                            >
                                                <option>Select State</option>
                                                {
                                                    filterstate.length === 0 ? "No data found" : filterstate.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items.State_Name}>{items.State_Name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                    </div>



                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>District</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('District', e.target.value)}
                                            >

                                                <option value={0}>Select District</option>
                                                {
                                                    filterdistrict.length === 0 ? "No data found" : filterdistrict.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items.District_Name}>{items.District_Name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>





                                        <div className='w-[49%]'>
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Address', e.target.value)}
                                            />
                                        </div>
                                    </div>



                                    <div className='mb-[10px] flex justify-between'>

                                        <div className='w-[49%]'>
                                            <label>Citizenship</label>
                                            <select
                                                type="text"
                                                maxLength={1}
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Citizenship', e.target.value)}
                                            >

                                                <option>Select Citizenship</option>
                                                {
                                                    countrydata.length === 0 ? "No data found" : countrydata.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>



                                        <div className='w-[49%]'>
                                            <label>Address Proof</label>
                                            <div className='relative h-[100px]'>
                                                <input
                                                    type="file"
                                                    maxLength={1}
                                                    className='w-[100%] h-[100%] rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none absolute z-30 opacity-0'
                                                    onChange={(e) => formik.setFieldValue('Address_Proof', e.target.files[0]) && setimgname(e.target.value)}
                                                />

                                                <div className='w-[100%] h-[100%] border-dashed border-[1px] bg-[#EAE8E8] rounded-[10px] border-[black] absolute top-[3px] z-0 flex justify-center items-center'>
                                                    <div className='flex justify-center items-center flex-col'>
                                                        <p className='text-center text-[20px]'> <FaFile /></p>
                                                        <p>{imgname.slice(11, 50)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className='w-[49%]'>
                                                    <label>Religion</label>
                                                    <select
        
                                                        maxLength={1}
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Religion', e.target.value) && viewcaste(e.target.value)}
                                                    >
        
                                                        <option value={0}>Select Religion</option>
                                                        {
                                                            religions.length === 0 ? "No data found" : religions.map((items, index) => {
                                                                return (
                                                                    <option key={index} value={items.Religion_Name}>{items.Religion_Name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
        
                                                </div> */}



                                    </div>




                                    <div className='mb-[10px]'>
                                        <div className=''>
                                            <button type="submit" className='w-[100%] p-2 text-[white]  py-3 rounded-[10px] mt-[3px] border-[1px] outline-none bg-[red]'>
                                                Create Profile
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
