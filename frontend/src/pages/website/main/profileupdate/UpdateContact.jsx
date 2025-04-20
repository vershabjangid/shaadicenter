import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../common/Loader'
import { Header } from '../../../../common/Header'
import { Footer } from '../../../../common/Footer'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { api, getCookie } from '../../../../url/Url'
import toast from 'react-hot-toast'

export function UpdateContact() {
    let [loader, setloader] = useState(false)

    let location = useLocation();
    let data = location.state
    console.log(data)


    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Country: data.Country,
            State: data.State,
            District: data.District,
            Address: data.Address,
            Citizenship: data.Citizenship,
        },

        onSubmit: (value, { resetForm }) => {
            updatedata(formik.values)
            setloader(true)
            resetForm({
                Sub_id: getCookie('User_Id'),
                Country: "",
                State: "",
                District: "",
                Address: "",
                Citizenship: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let updatedata = (value) => {
        try {
            api.put('/update-about-residential', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader('false')
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
                                            <p className='font-[800] text-[25px]'>Contact Details</p>
                                            <div className='mt-[10px] w-[100%]'>
                                                <div className='w-[100%]'>
                                                    <label>Country</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#fffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Country', e.target.value) && filterstates(e.target.value)}
                                                        defaultValue={data.Country}
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



                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>State</label>
                                                    <select
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#fffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('State', e.target.value) && filterdistricts(e.target.value)}
                                                        defaultValue={data.State}
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



                                            <div className='mt-[10px]'>
                                                <div className='w-[100%]'>
                                                    <label>District</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#fffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('District', e.target.value)}
                                                        defaultValue={data.District}
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

                                                <div className='w-[100%] my-[10px]'>
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#fffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Address', e.target.value)}
                                                        defaultValue={data.Address}
                                                    />
                                                </div>
                                            </div>



                                            <div className='my-[10px]'>

                                                <div className='w-[100%]'>
                                                    <label>Citizenship</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#fffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Citizenship', e.target.value)}
                                                        defaultValue={data.Citizenship}
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
