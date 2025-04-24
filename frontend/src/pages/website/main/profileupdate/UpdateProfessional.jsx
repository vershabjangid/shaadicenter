import React, { useEffect, useState } from 'react'
import { Footer } from '../../../../common/Footer'
import { Loader } from '../../../../common/Loader'
import { Header } from '../../../../common/Header'
import { useFormik } from 'formik'
import { api, getCookie } from '../../../../url/Url'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
export function UpdateProfessional() {
    let [loader, setloader] = useState(false)

    let location = useLocation();
    let data = location.state

    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Highest_Education: data.Highest_Education || "",
            Education_Details: data.Education_Details || "",
            Institution_Name: data.Institution_Name || "",
            Occupation_Name: data.Occupation_Name || "",
            Occupation_Details: data.Occupation_Details || "",
            Organization_Name: data.Organization_Name || "",
            Sector: data.Sector || "",
            Salary: data.Salary || ""
        },

        validationSchema: Yup.object().shape({
            Highest_Education: Yup.string().required("Highest Education is required"),
            Education_Details: Yup.string().required("Education Details is required"),
            Institution_Name: Yup.string().required("Institution Name is required"),
            Occupation_Name: Yup.string().required("Occupation is required"),
            Occupation_Details: Yup.string().required("Occupation Details is required"),
            Organization_Name: Yup.string().required("Organization Name is required"),
            Sector: Yup.string().required("Sector is required"),
            Salary: Yup.string().required("Salary is required")
        }),

        onSubmit: () => {
            setloader(true);
            insertdata(formik.values)
        }
    })


    let [educationdata, seteducationdata] = useState([])
    let [occupationdata, setoccupationdata] = useState([])

    let navigate = useNavigate();
    let datas = async () => {
        try {
            setloader(true)
            let [education, occupation] = await Promise.all([
                api.get('/view-active-education'),
                api.get('/view-active-occupation')
            ])
            return {
                educationdata: education.data,
                occupationdata: occupation.data
            }
        }
        catch (error) {
            console.log(error)
            navigate('/error')
        }
    }


    let finalfetch = () => {
        datas()
            .then((res) => {
                seteducationdata(res.educationdata)
                setoccupationdata(res.occupationdata)
                setloader(false)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    useEffect(() => {
        finalfetch()
    }, [])


    let notifysuccess = (success) => toast.success(success);
    let notifyerror = (error) => toast.error(error);
    let insertdata = (value) => {
        try {
            api.put('/update-about-professional', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        setloader(false)
                        navigate(`/view-profile/${formik.values.Sub_id}`)
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
                loader ? <Loader />
                    : <section className='main'>
                        <Header />
                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#ffffff]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>


                                <section className='w-[100%] my-[20px]  bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                <h1 className='text-[23px]'>Professional Details</h1>
                                        <form action="" className='text-start' onSubmit={formik.handleSubmit}>
                                            <div className=''>
                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Education</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Highest_Education', e.target.value)}
                                                        defaultValue={data.Highest_Education}
                                                    >

                                                        <option>Select Education</option>
                                                        {
                                                            educationdata.length === 0 ? "No data found" : educationdata.map((items, index) => {
                                                                return (
                                                                    <option key={index} value={items.Education_Name}>{items.Education_Name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <div className='text-[red]'>
                                                        {formik.errors.Highest_Education}
                                                    </div>
                                                </div>

                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Education Details</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Education_Details', e.target.value)}
                                                        defaultValue={data.Education_Details}
                                                    />
                                                    <div className='text-[red]'>
                                                        {formik.errors.Education_Details}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='mb-[10px] '>
                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Occupation</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Occupation_Name', e.target.value)}
                                                        defaultValue={data.Occupation_Name}
                                                    >

                                                        <option>Select Occupation</option>
                                                        {
                                                            occupationdata.length === 0 ? "No data found" : occupationdata.map((items, index) => {
                                                                return (
                                                                    <option key={index} value={items.Occupation_Name}>{items.Occupation_Name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <div className='text-[red]'>
                                                        {formik.errors.Occupation_Name}
                                                    </div>
                                                </div>

                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Occupation Details</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Occupation_Details', e.target.value)}
                                                        defaultValue={data.Occupation_Details}
                                                    />
                                                    <div className='text-[red]'>
                                                        {formik.errors.Occupation_Details}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='mb-[10px] mt-[10px]'>
                                                <div className='w-[100%]'>
                                                    <label>College / Institution Name</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Institution_Name', e.target.value)}
                                                        defaultValue={data.Institution_Name}
                                                    />
                                                    <div className='text-[red]'>
                                                        {formik.errors.Institution_Name}
                                                    </div>
                                                </div>


                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Organization Name</label>
                                                    <input
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Organization_Name', e.target.value)}
                                                        defaultValue={data.Organization_Name}
                                                    />
                                                    <div className='text-[red]'>
                                                        {formik.errors.Organization_Name}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=''>
                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Sector</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Sector', e.target.value)}
                                                        defaultValue={data.Sector}
                                                    >

                                                        <option>Select Sector</option>
                                                        <option value="Government">Government</option>
                                                        <option value="Private">Private</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Defence">Defence</option>
                                                        <option value="Not Working">Not Working</option>
                                                    </select>
                                                    <div className='text-[red]'>
                                                        {formik.errors.Sector}
                                                    </div>
                                                </div>

                                                <div className='w-[100%] mt-[10px]'>
                                                    <label>Salary / Income</label>
                                                    <select
                                                        type="text"
                                                        className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                        onChange={(e) => formik.setFieldValue('Salary', e.target.value)}
                                                        defaultValue={data.Salary}
                                                    >

                                                        <option>Select Salary</option>
                                                        <option value="Nill">Nill</option>
                                                        <option value="Rs. 0 - 50,000">Rs. 0 - 50,000</option>
                                                        <option value="Rs. 50,001 - 1,00,000">Rs. 50,001 - 1,00,000</option>
                                                        <option value="Rs. 1,00,001 - 2,00,000">Rs. 1,00,001 - 2,00,000</option>
                                                        <option value="Rs. 2,00,001 - 3,00,000">Rs. 2,00,001 - 3,00,000</option>
                                                        <option value="Rs. 3,00,001 - 4,00,000">Rs. 3,00,001 - 4,00,000</option>
                                                        <option value="Rs. 4,00,001 - 5,00,000">Rs. 4,00,001 - 5,00,000</option>
                                                        <option value="Rs. 5,00,001 - 7,00,000">Rs. 5,00,001 - 7,00,000</option>
                                                        <option value="Rs. 7,00,001 - 10,00,000">Rs. 7,00,001 - 10,00,000</option>
                                                        <option value="Rs. 10,00,001 - 15,00,000">Rs. 10,00,001 - 15,00,000</option>
                                                        <option value="Rs. 15,00,001 - 20,00,000">Rs. 15,00,001 - 20,00,000</option>
                                                        <option value="Rs. 20,00,001 - 30,00,000">Rs. 20,00,001 - 30,00,000</option>
                                                        <option value="Rs. 30,00,001 - 40,00,000">Rs. 30,00,001 - 40,00,000</option>
                                                        <option value="Rs. 40,00,001 - 50,00,000">Rs. 40,00,001 - 50,00,000</option>
                                                        <option value="Rs. 50,00,001 - 75,00,000">Rs. 50,00,001 - 75,00,000</option>
                                                        <option value="Rs. 75,00,001 - 1,00,00,000">Rs. 75,00,001 - 1,00,00,000</option>
                                                        <option value="Rs. 1,00,00,001 Above">Rs. 1,00,00,001 Above</option>
                                                        <option value="under $ 25,000">under $ 25,000</option>
                                                        <option value="$ 25,001 - 50,000">$ 25,001 - 50,000</option>
                                                        <option value="$ 50,001 - 75,000">$ 50,001 - 75,000</option>
                                                        <option value="$ 75,001 - 1,00,000">$ 75,001 - 1,00,000</option>
                                                        <option value="$ 1,00,001 - 1,50,000">$ 1,00,001 - 1,50,000</option>
                                                        <option value="$ 1,50,001 - 2,00,000">$ 1,50,001 - 2,00,000</option>
                                                        <option value="200001 $ or Above">200001 $ or Above</option>

                                                    </select>
                                                    <div className='text-[red]'>
                                                        {formik.errors.Salary}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className='bg-[#ffae18] px-6 py-2 mt-3 rounded-[10px] text-white'>Save</button>
                                        </form>
                                    </section>
                                </section>
                            </section>
                        </section >
                        <Footer />
                    </section >
            }
        </>
    )
}
