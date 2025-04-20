import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api, getCookie } from '../../../../url/Url'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { toFormData } from 'axios'
import { Footer } from '../../../../common/Footer'
import { Header } from '../../../../common/Header'
import { Loader } from '../../../../common/Loader'
export function UpdateBasic() {
    let location = useLocation()
    let data = location.state
    console.log(data)

    let [loader, setloader] = useState(false)

    let [imgname, setimgname] = useState("...........Upload Your Profile Picture")
    let formik = useFormik({
        initialValues: {
            Sub_id: getCookie('User_Id'),
            Marital_Status: data.Marital_Status || "",
            Profile_For: data.Profile_For || "",
            Full_Name: data.Full_Name || "",
            Gender: data.Gender || "",
            Date_Of_Birth: data.Date_Of_Birth || "",
            Body_Type: data.Body_Type || "",
            Height: data.Height || "",
            Weight: data.Weight || "",
            Physical_Status: data.Physical_Status || "",
            Eating_Habits: data.Eating_Habits || "",
            Drinking_Habits: data.Drinking_Habits || "",
            Smoking_Habits: data.Smoking_Habits || "",
            Religion: data.Religion || "",
            Mother_Tongue: data.Mother_Tongue || "",
            Caste: data.Caste || "",
        },

        validationSchema: Yup.object().shape({
            Marital_Status: Yup.string().required("Marital Status is required"),
            Profile_For: Yup.string().required("Profile For is required"),
            Full_Name: Yup.string().required("Full Name is required"),
            Gender: Yup.string().required("Gender For is required"),
            Date_Of_Birth: Yup.string().required("DOB is required"),
            Body_Type: Yup.string().required("Body Type is required"),
            Height: Yup.string().required("Height is required"),
            Weight: Yup.string().required("Weight is required"),
            Physical_Status: Yup.string().required("Physical Status is required"),
            Eating_Habits: Yup.string().required("Eating Habits is required"),
            Drinking_Habits: Yup.string().required("Drinking Habits is required"),
            Smoking_Habits: Yup.string().required("Smoking Habits is required"),
            Religion: Yup.string().required("Religion is required"),
            Mother_Tongue: Yup.string().required("Mother Tongue is required"),
            Caste: Yup.string().required("Caste is required")
        }),
        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Marital_Status: "",
                Profile_For: "",
                Full_Name: "",
                Gender: "",
                Date_Of_Birth: "",
                Body_Type: "",
                Height: "",
                Weight: "",
                Physical_Status: "",
                Eating_Habits: "",
                Drinking_Habits: "",
                Smoking_Habits: "",
                Religion: "",
                Mother_Tongue: "",
                Caste: "",
            })
        }

    })

    const notifysuccess = (success) => toast.success(success);
    const notifyerror = (error) => toast.error(error);
    const navigate = useNavigate();
    let insertdata = (values) => {
        try {
            api.put('/update-about-basic', values, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                        setloader(false)
                        navigate(`/view-profile/${getCookie('User_Id')}`)
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

    let [religions, setreligions] = useState([])
    let [mothertongue, setmothertongue] = useState([])
    let viewdata = async () => {
        try {
            let [viewreligion, viewmothertongue] = await Promise.all([
                api.get('/view-active-religions', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                }),
                api.get('/view-active-mothertongue', {
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                })
            ])


            return {
                viewreligions: viewreligion.data,
                viewmothertongues: viewmothertongue.data
            }
        }
        catch (error) {
            console.log(error)
            navigate('/error')
        }
    }



    let finalfetch = () => {
        viewdata()
            .then((res) => {
                console.log(res)
                setreligions(res.viewreligions)
                setmothertongue(res.viewmothertongues)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }



    let [caste, setcaste] = useState([])
    let viewcaste = (value) => {
        try {
            api.post('/view-active-caste', { data: value }, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setcaste([])
                    }
                    else {
                        setcaste(res.data)
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


    useEffect(() => {
        finalfetch();
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
                                            <p className='font-[800] text-[25px]'>Basic Details</p>
                                            <div className='mt-[5px]'>
                                                <label>Profile For<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    type="text"
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Profile_For', e.target.value)}
                                                    defaultValue={data.Profile_For}
                                                >

                                                    <option value={0}>Select Profile</option>
                                                    <option value="Myself">Myself</option>
                                                    <option value="Daughter">Daughter</option>
                                                    <option value="Son">Son</option>
                                                    <option value="Sister">Sister</option>
                                                    <option value="Brother">Brother</option>
                                                    <option value="Relative">Relative</option>
                                                    <option value="Friend">Friend</option>

                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Profile_For}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Full Name<sup className='text-[red]'>*</sup></label>
                                                <input
                                                    type='text'
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Full_Name', e.target.value)}
                                                    defaultValue={data.Full_Name}
                                                />
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Full_Name}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Gender<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Gender', e.target.value)}
                                                    defaultValue={data.Gender}
                                                >
                                                    <option value={0}>Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Gender}</div>
                                            </div>

                                            <div className='w-[100%]'>
                                                <label>Date of Birth<sup className='text-[red]'>*</sup></label>
                                                <input
                                                    type="date"
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Date_Of_Birth', e.target.value)}
                                                    defaultValue={data.Date_Of_Birth}
                                                />
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Date_Of_Birth}</div>
                                            </div>

                                            <div className='w-[100%]'>
                                                <label>Marital Status<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    type="text"
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Marital_Status', e.target.value)}
                                                    defaultValue={data.Marital_Status}
                                                >

                                                    <option value={0}>Select Marital Status</option>
                                                    <option value="Never Married">Never Married</option>
                                                    <option value="Windowed">Windowed</option>
                                                    <option value="Divorced">Divorced</option>
                                                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                                                    <option value="Separated">Separated</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Marital_Status}</div>
                                            </div>



                                            <div className='w-[100%]'>
                                                <label>Body Type<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Body_Type', e.target.value)}
                                                    defaultValue={data.Body_Type}
                                                >
                                                    <option value={0}>Select Body Type</option>
                                                    <option value="Slim">Slim</option>
                                                    <option value="Athletic">Athletic</option>
                                                    <option value="Average">Average</option>
                                                    <option value="Heavy">Heavy</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Body_Type}</div>
                                            </div>



                                            <div className='w-[100%]'>
                                                <label>Height<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    type="text"
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Height', e.target.value)}
                                                    defaultValue={data.Height}
                                                >

                                                    <option value={0}>Select Height</option>
                                                    <option value="3ft.5in-105cm">3ft.5in-105cm</option>
                                                    <option value="3ft.6in-107cm">3ft.6in-107cm</option>
                                                    <option value="3ft.7in-110cm">3ft.7in-110cm</option>
                                                    <option value="3ft.8in-112cm">3ft.8in-112cm</option>
                                                    <option value="3ft.9in-115cm">3ft.9in-115cm</option>
                                                    <option value="3ft.10in-117cm">3ft.10in-117cm</option>
                                                    <option value="3ft.11in-120cm">3ft.11in-120cm</option>
                                                    <option value="4ft-122cm">4ft-122cm</option>
                                                    <option value="4ft.1in-125cm">4ft.1in-125cm</option>
                                                    <option value="4ft.2in-127cm">4ft.2in-127cm</option>
                                                    <option value="4ft.3in-130cm">4ft.3in-130cm</option>
                                                    <option value="4ft.4in-132cm">4ft.4in-132cm</option>
                                                    <option value="4ft.5in-135cm">4ft.5in-135cm</option>
                                                    <option value="4ft.6in-137cm">4ft.6in-137cm</option>
                                                    <option value="4ft.7in-140cm">4ft.7in-140cm</option>
                                                    <option value="4ft.8in-142cm">4ft.8in-142cm</option>
                                                    <option value="4ft.9in-145cm">4ft.9in-145cm</option>
                                                    <option value="4ft.10in-147cm">4ft.10in-147cm</option>
                                                    <option value="4ft.11in-150cm">4ft.11in-150cm</option>
                                                    <option value="5ft-152cm">5ft-152cm</option>
                                                    <option value="5ft.1in-155cm">5ft.1in-155cm</option>
                                                    <option value="5ft.2in-157cm">5ft.2in-157cm</option>
                                                    <option value="5ft.3in-160cm">5ft.3in-160cm</option>
                                                    <option value="5ft.4in-162cm">5ft.4in-162cm</option>
                                                    <option value="5ft.5in-165cm">5ft.5in-165cm</option>
                                                    <option value="5ft.6in-167cm">5ft.6in-167cm</option>
                                                    <option value="5ft.7in-170cm">5ft.7in-170cm</option>
                                                    <option value="5ft.8in-172cm">5ft.8in-172cm</option>
                                                    <option value="5ft.9in-175cm">5ft.9in-175cm</option>
                                                    <option value="5ft.10in-177cm">5ft.10in-177cm</option>
                                                    <option value="5ft.11in-180cm">5ft.11in-180cm</option>
                                                    <option value="6ft-182cm">6ft-182cm</option>
                                                    <option value="6ft.1in-185cm">6ft.1in-185cm</option>
                                                    <option value="6ft.2in-187cm">6ft.2in-187cm</option>
                                                    <option value="6ft.3in-190cm">6ft.3in-190cm</option>
                                                    <option value="6ft.4in-192cm">6ft.4in-192cm</option>
                                                    <option value="6ft.5in-195cm">6ft.5in-195cm</option>
                                                    <option value="6ft.6in-197cm">6ft.6in-197cm</option>
                                                    <option value="6ft.7in-200cm">6ft.7in-200cm</option>
                                                    <option value="6ft.8in-202cm">6ft.8in-202cm</option>
                                                    <option value="6ft.9in-205cm">6ft.9in-205cm</option>
                                                    <option value="6ft.10in-207cm">6ft.10in-207cm</option>
                                                    <option value="6ft.11in-210cm">6ft.11in-210cm</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Height}</div>
                                            </div>

                                            <div className='w-[100%]'>
                                                <label>Weight<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    type="text"
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Weight', e.target.value)}
                                                    defaultValue={data.Weight}
                                                >
                                                    <option value={0}>Select Weight</option>
                                                    <option value="41Kg">41 Kg</option>
                                                    <option value="42Kg">42 Kg</option>
                                                    <option value="43Kg">43 Kg</option>
                                                    <option value="44Kg">44 Kg</option>
                                                    <option value="45Kg">45 Kg</option>
                                                    <option value="46Kg">46 Kg</option>
                                                    <option value="47Kg">47 Kg</option>
                                                    <option value="48Kg">48 Kg</option>
                                                    <option value="49Kg">49 Kg</option>
                                                    <option value="50Kg">50 Kg</option>
                                                    <option value="51Kg">51 Kg</option>
                                                    <option value="52Kg">52 Kg</option>
                                                    <option value="53Kg">53 Kg</option>
                                                    <option value="54Kg">54 Kg</option>
                                                    <option value="55Kg">55 Kg</option>
                                                    <option value="56Kg">56 Kg</option>
                                                    <option value="57Kg">57 Kg</option>
                                                    <option value="58Kg">58 Kg</option>
                                                    <option value="59Kg">59 Kg</option>
                                                    <option value="60Kg">60 Kg</option>
                                                    <option value="61Kg">61 Kg</option>
                                                    <option value="62Kg">62 Kg</option>
                                                    <option value="63Kg">63 Kg</option>
                                                    <option value="64Kg">64 Kg</option>
                                                    <option value="65Kg">65 Kg</option>
                                                    <option value="66Kg">66 Kg</option>
                                                    <option value="67Kg">67 Kg</option>
                                                    <option value="68Kg">68 Kg</option>
                                                    <option value="69Kg">69 Kg</option>
                                                    <option value="70Kg">70 Kg</option>
                                                    <option value="71Kg">71 Kg</option>
                                                    <option value="72Kg">72 Kg</option>
                                                    <option value="73Kg">73 Kg</option>
                                                    <option value="74Kg">74 Kg</option>
                                                    <option value="75Kg">75 Kg</option>
                                                    <option value="76Kg">76 Kg</option>
                                                    <option value="77Kg">77 Kg</option>
                                                    <option value="78Kg">78 Kg</option>
                                                    <option value="79Kg">79 Kg</option>
                                                    <option value="80Kg">80 Kg</option>
                                                    <option value="81Kg">81 Kg</option>
                                                    <option value="82Kg">82 Kg</option>
                                                    <option value="83Kg">83 Kg</option>
                                                    <option value="84Kg">84 Kg</option>
                                                    <option value="85Kg">85 Kg</option>
                                                    <option value="86Kg">86 Kg</option>
                                                    <option value="87Kg">87 Kg</option>
                                                    <option value="88Kg">88 Kg</option>
                                                    <option value="89Kg">89 Kg</option>
                                                    <option value="90Kg">90 Kg</option>
                                                    <option value="91Kg">91 Kg</option>
                                                    <option value="92Kg">92 Kg</option>
                                                    <option value="93Kg">93 Kg</option>
                                                    <option value="94Kg">94 Kg</option>
                                                    <option value="95Kg">95 Kg</option>
                                                    <option value="96Kg">96 Kg</option>
                                                    <option value="97Kg">97 Kg</option>
                                                    <option value="98Kg">98 Kg</option>
                                                    <option value="99Kg">99 Kg</option>
                                                    <option value="100Kg">100 Kg</option>
                                                    <option value="101Kg">101 Kg</option>
                                                    <option value="102Kg">102 Kg</option>
                                                    <option value="103Kg">103 Kg</option>
                                                    <option value="104Kg">104 Kg</option>
                                                    <option value="105Kg">105 Kg</option>
                                                    <option value="106Kg">106 Kg</option>
                                                    <option value="107Kg">107 Kg</option>
                                                    <option value="108Kg">108 Kg</option>
                                                    <option value="109Kg">109 Kg</option>
                                                    <option value="110Kg">110 Kg</option>
                                                    <option value="111Kg">111 Kg</option>
                                                    <option value="112Kg">112 Kg</option>
                                                    <option value="113Kg">113 Kg</option>
                                                    <option value="114Kg">114 Kg</option>
                                                    <option value="115Kg">115 Kg</option>
                                                    <option value="116Kg">116 Kg</option>
                                                    <option value="117Kg">117 Kg</option>
                                                    <option value="118Kg">118 Kg</option>
                                                    <option value="119Kg">119 Kg</option>
                                                    <option value="120Kg">120 Kg</option>
                                                    <option value="121Kg">121 Kg</option>
                                                    <option value="122Kg">122 Kg</option>
                                                    <option value="123Kg">123 Kg</option>
                                                    <option value="124Kg">124 Kg</option>
                                                    <option value="125Kg">125 Kg</option>
                                                    <option value="126Kg">126 Kg</option>
                                                    <option value="127Kg">127 Kg</option>
                                                    <option value="128Kg">128 Kg</option>
                                                    <option value="129Kg">129 Kg</option>
                                                    <option value="130Kg">130 Kg</option>
                                                    <option value="131Kg">131 Kg</option>
                                                    <option value="132Kg">132 Kg</option>
                                                    <option value="133Kg">133 Kg</option>
                                                    <option value="134Kg">134 Kg</option>
                                                    <option value="135Kg">135 Kg</option>
                                                    <option value="136Kg">136 Kg</option>
                                                    <option value="137Kg">137 Kg</option>
                                                    <option value="138Kg">138 Kg</option>
                                                    <option value="139Kg">139 Kg</option>
                                                    <option value="140Kg">140 Kg</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Weight}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Physical Status<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Physical_Status', e.target.value)}
                                                    defaultValue={data.Physical_Status}
                                                >
                                                    <option value={0}>Select Physical Status</option>
                                                    <option value="Normal">Normal</option>
                                                    <option value="Physically Challenged">Physically Challenged</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Physical_Status}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Eating Habits<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Eating_Habits', e.target.value)}
                                                    defaultValue={data.Eating_Habits}
                                                >
                                                    <option value={0}>Select Eating Habits</option>
                                                    <option value="Vegetarian">Vegetarian</option>
                                                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                                                    <option value="Eggetarian">Eggetarian</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Eating_Habits}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Drinking Habits<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Drinking_Habits', e.target.value)}
                                                    defaultValue={data.Drinking_Habits}
                                                >
                                                    <option value={0}>Select Drinking Habits</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Drinking_Habits}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Smoking Habits<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Smoking_Habits', e.target.value)}
                                                    defaultValue={data.Smoking_Habits}
                                                >
                                                    <option value={0}>Select Smoking Habits</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Smoking_Habits}</div>
                                            </div>



                                            <div className='w-[100%]'>
                                                <label>Mother Tongue<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    type="text"
                                                    maxLength={1}
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px]  mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Mother_Tongue', e.target.value)}
                                                    defaultValue={data.Mother_Tongue}
                                                >

                                                    <option value={0}>Select Mother Tongue</option>
                                                    {
                                                        mothertongue.length === 0 ? "No data found" : mothertongue.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.MotherTongue_Name}>{items.MotherTongue_Name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Mother_Tongue}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Religion<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px] mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Religion', e.target.value) && viewcaste(e.target.value)}
                                                    defaultValue={data.Religion_Name}
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
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Religion}</div>
                                            </div>


                                            <div className='w-[100%]'>
                                                <label>Caste<sup className='text-[red]'>*</sup></label>
                                                <select
                                                    className='w-[100%] p-2 py-[10px] rounded-[10px]  mt-[3px] border-[1px] bg-[#ffffff] outline-none'
                                                    onChange={(e) => formik.setFieldValue('Caste', e.target.value)}
                                                    defaultValue={data.Caste}
                                                >

                                                    <option value={0}>Select Caste</option>
                                                    {
                                                        caste.length === 0 ? "No data found" : caste.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items.Caste_Name}>{items.Caste_Name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                <div className='mb-[10px] mt-[1px] text-[red]'>{formik.errors.Caste}</div>
                                            </div>
                                            <button className='bg-[#ffae18] px-6 py-2 mt-2 rounded-[10px] text-white'>Save</button>
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