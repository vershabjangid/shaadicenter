import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '../../../common/Loader'
import logo from '../../../images/Group 2.svg'
import { useFormik } from 'formik'
import { api, getCookie } from '../../../url/Url'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
export function ProfessionalDetails() {

    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Highest_Education: "",
            Education_Details: "",
            Institution_Name: "",
            Occupation_Name: "",
            Occupation_Details: "",
            Organization_Name: "",
            Sector: "",
            Salary: ""
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
            api.post('/add-professional', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        setloader(false)
                        navigate(`/residential-details/${res.data.User_id}`)
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
                            <h1 className='font-[700] mt-[10px] text-[50px]'>Professional Information</h1>
                            <p className='mt-[5px] font-[500]'></p>
                            <section className='w-[80%] m-auto mt-[20px]'>
                                <form action="" className='text-start' onSubmit={formik.handleSubmit}>
                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>Education</label>
                                            <select
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Highest_Education', e.target.value)}
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

                                        <div className='w-[49%]'>
                                            <label>Education Details</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Education_Details', e.target.value)}
                                            />
                                            <div className='text-[red]'>
                                                {formik.errors.Education_Details}
                                            </div>
                                        </div>
                                    </div>


                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>Occupation</label>
                                            <select
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Occupation_Name', e.target.value)}
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

                                        <div className='w-[49%]'>
                                            <label>Occupation Details</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Occupation_Details', e.target.value)}
                                            />
                                            <div className='text-[red]'>
                                                {formik.errors.Occupation_Details}
                                            </div>
                                        </div>
                                    </div>


                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>College / Institution Name</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Institution_Name', e.target.value)}
                                            />
                                            <div className='text-[red]'>
                                                {formik.errors.Institution_Name}
                                            </div>
                                        </div>


                                        <div className='w-[49%]'>
                                            <label>Organization Name</label>
                                            <input
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Organization_Name', e.target.value)}
                                            />
                                            <div className='text-[red]'>
                                                {formik.errors.Organization_Name}
                                            </div>
                                        </div>
                                    </div>


                                    <div className='mb-[10px] flex justify-between'>
                                        <div className='w-[49%]'>
                                            <label>Sector</label>
                                            <select
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Sector', e.target.value)}
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

                                        <div className='w-[49%]'>
                                            <label>Salary / Income</label>
                                            <select
                                                type="text"
                                                className='w-[100%] p-2 rounded-[10px] mt-[3px] border-[1px] bg-[#EAE8E8] outline-none'
                                                onChange={(e) => formik.setFieldValue('Salary', e.target.value)}
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


                                    <div className='mb-[10px]'>
                                        <div className=''>
                                            <button type="submit" className='w-[100%] p-2 text-[white] bg-[red]  py-3 rounded-[10px] mt-[3px] border-[1px] outline-none'>
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
