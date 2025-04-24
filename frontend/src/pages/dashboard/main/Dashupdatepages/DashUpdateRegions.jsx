import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../common/Loader';
import { DashboardHeader } from '../../../../common/DashboardHeader';
import { DashboardSidebar } from '../../../../common/DashboardSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { api, getCookie } from '../../../../url/Url';

export function DashUpdateRegions() {
    let [loader, setloader] = useState(false)

    let { _id, CountryName, CountryStatus, StateName, CountryName1, StateStatus, DistrictName, CountryName2, StateName1, DistrictStatus } = useParams();
    console.log({ DistrictName, CountryName2, StateName1, DistrictStatus })
    let formik = useFormik({
        initialValues: {
            _id: _id,
            Country_Name: CountryName || "",
            Country_Status: CountryStatus || "",

            State_Name: StateName || "",
            Country_Name1: CountryName1 || "",
            State_Status: StateStatus || "",

            District_Name: DistrictName || "",
            Country_Name2: CountryName2 || "",
            State_Name1: StateName1 || "",
            District_Status: DistrictStatus || ""
        },
        onSubmit: (values, { resetForm }) => {
            updatedata(formik.values)
            resetForm({
                Country_Name: "",
                Country_Status: "",
                State_Name: "",
                Country_Name1: "",
                State_Status: "",
                District_Name: "",
                Country_Name2: "",
                State_Name1: "",
                District_Status: ""
            })
            setloader(true)
        }
    })
    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let updatedata = (value) => {
        try {
            api.put('/update-regions', value, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader('false')
                        navigate('/dash-regions')

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
    return (
        <>
            {
                loader ? <Loader /> :
                    <section className='dash_main w-[100%]'>
                        <DashboardHeader />

                        <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                            <DashboardSidebar />


                            <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red] bg-[#deeff6] p-3'>
                                <h1 className='text-[30px] font-[600]'>Regions</h1>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>UPDATE COUNTRY</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Country Name
                                                </label>
                                                <input type="text" defaultValue={CountryName} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Name', e.target.value)} />
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select defaultValue={CountryStatus === 'true' ? 1 : 0} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Status', e.target.value)}>
                                                    <option>Choose Active Status</option>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>De-Active</option>
                                                </select>
                                            </section>
                                        </section>

                                        <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                                    </form>
                                </section>

                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>UPDATE STATE</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    State Name
                                                </label>
                                                <input type="text" defaultValue={StateName} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('State_Name', e.target.value)} />
                                            </section>


                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Country Name
                                                </label>
                                                <select type="text" defaultValue={CountryName1} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Name1', e.target.value)} >
                                                    <option>Select Country</option>
                                                    {
                                                        countrydata.length === 0 ? "No data found" : countrydata.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>
                                        </section>

                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select defaultValue={StateStatus === 'true' ? 1 : 0} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('State_Status', e.target.value)}>
                                                    <option>Choose Active Status</option>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>De-Active</option>
                                                </select>
                                            </section>
                                        </section>

                                        <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                                    </form>
                                </section>


                                <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                                    <p className='text-[15px]'>UPDATE DISTRICT</p>

                                    <form onSubmit={formik.handleSubmit}>
                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    District Name
                                                </label>
                                                <input type="text" defaultValue={DistrictName} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('District_Name', e.target.value)} />
                                            </section>


                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Country Name
                                                </label>
                                                <select type="text" defaultValue={CountryName2} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('Country_Name2', e.target.value) && filterstates(e.target.value)} >
                                                    <option>Select Country</option>
                                                    {
                                                        countrydata.length === 0 ? "No data found" : countrydata.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>
                                        </section>

                                        <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    State Name
                                                </label>
                                                <select type="text" defaultValue={StateName1} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('State_Name1', e.target.value)} >
                                                    <option>Select State</option>
                                                    {
                                                        filterstate.length === 0 ? "No data found" : filterstate.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.State_Name}>{items.State_Name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>

                                            <section className='w-[48%]'>
                                                <label htmlFor="">
                                                    Status
                                                </label>
                                                <select defaultValue={DistrictStatus === 'true' ? 1 : 0} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]' onChange={(e) => formik.setFieldValue('District_Status', e.target.value)}>
                                                    <option>Choose Active Status</option>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>De-Active</option>
                                                </select>
                                            </section>
                                        </section>

                                        <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                                    </form>
                                </section>
                            </section>
                        </section>
                    </section>
            }
            <Toaster />
        </>
    )
}
