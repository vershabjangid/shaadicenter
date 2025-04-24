import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaFile } from 'react-icons/fa'
import { CgFormatLineHeight, CgFormatText } from 'react-icons/cg'
import { MdTextFormat } from 'react-icons/md'
import { toFormData } from 'axios'
import { api, getCookie } from '../../../../url/Url'
import { DashboardHeader } from '../../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../../common/DashboardSidebar'
export function DashUpdateHomeFeaturedProfile() {
    let location = useLocation();
    let statedata = location.state;
    console.log(statedata.Featured_Profile_Card_Section_Name_Font_Size)
    let [aligntext, setaligntext] = useState([statedata.Featured_Profile_Card_Section_Name_Text_Align, statedata.Featured_Profile_Age_Text_Align, statedata.Featured_Profile_Location_Text_Align])
    let [imgname, setimgname] = useState("...........Upload Banner")
    let formik = useFormik({
        initialValues: {
            _id: statedata._id,
            Featured_Profile_Card_Image: "",
            Featured_Profile_Card_Section_Name_Text_Bold: statedata.Featured_Profile_Card_Section_Name_Text_Bold || "",
            Featured_Profile_Card_Section_Name_Font_Size: statedata.Featured_Profile_Card_Section_Name_Font_Size || "",
            Featured_Profile_Card_Section_Name_Text_Align: aligntext[0],
            Featured_Profile_Card_Section_Name_Text_Decoration: statedata.Featured_Profile_Card_Section_Name_Text_Decoration || "",
            Featured_Profile_Card_Section_Home_Name_Color: statedata.Featured_Profile_Card_Section_Home_Name_Color || "",
            Featured_Profile_Card_Section_Name_Text_Line: statedata.Featured_Profile_Card_Section_Name_Text_Line || "",
            Featured_Profile_Card_Section_Name_Heading: statedata.Featured_Profile_Card_Section_Name_Heading || "",

            Featured_Profile_Age_Text_Bold: statedata.Featured_Profile_Age_Text_Bold || "",
            Featured_Profile_Age_Font_Size: statedata.Featured_Profile_Age_Font_Size || "",
            Featured_Profile_Age_Text_Align: aligntext[1],
            Featured_Profile_Age_Text_Decoration: statedata.Featured_Profile_Age_Text_Decoration || "",
            Featured_Profile_Age_Color: statedata.Featured_Profile_Age_Color || "",
            Featured_Profile_Age_Text_Line: statedata.Featured_Profile_Age_Text_Line || "",
            Featured_Profile_Card_Section_Age_Heading: statedata.Featured_Profile_Card_Section_Age_Heading || "",


            Featured_Profile_Location_Text_Bold: statedata.Featured_Profile_Location_Text_Bold || "",
            Featured_Profile_Location_Font_Size: statedata.Featured_Profile_Location_Font_Size || "",
            Featured_Profile_Location_Text_Align: aligntext[2],
            Featured_Profile_Location_Text_Decoration: statedata.Featured_Profile_Location_Text_Decoration || "",
            Featured_Profile_Location_Color: statedata.Featured_Profile_Location_Color || "",
            Featured_Profile_Location_Text_Line: statedata.Featured_Profile_Location_Text_Line || "",
            Featured_Profile_Card_Section_Location_Heading: statedata.Featured_Profile_Card_Section_Location_Heading || ""

        },
        onSubmit: () => {
            formik.values.Featured_Profile_Card_Section_Name_Text_Align = aligntext[0]
            formik.values.Featured_Profile_Age_Text_Align = aligntext[1]
            formik.values.Featured_Profile_Location_Text_Align = aligntext[2]
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();
    let insertdata = (value) => {
        try {
            api.put('/update-featured-profile', toFormData(value), {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        navigate('/home-layout', { state: value })
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />
                <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red] bg-[#deeff6] p-3'>
                        <section className='flex justify-between'>
                            <h1 className='text-[30px] font-[600]'>Home</h1>
                            <Link to={"/home-layout"} className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white] z-[70]'>View layout</Link>
                        </section>


                        <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                            <p className='text-[15px]'>UPDATE FEATURED PROFILE</p>

                            <form onSubmit={formik.handleSubmit}>

                                <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                    <section className='w-[48%]'>

                                        <label htmlFor="" className=''>
                                            Name
                                        </label>
                                        <div className='w-[100%] mt-[5px]'>
                                            <div className='flex justify-between'>
                                                <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>

                                                    <FaBold />
                                                    <select defaultValue={statedata.Featured_Profile_Card_Section_Name_Text_Bold} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Name_Text_Bold', e.target.value)}>
                                                        <option>bold</option>
                                                        <option value="100">100</option>
                                                        <option value="200">200</option>
                                                        <option value="300">300</option>
                                                        <option value="400">400</option>
                                                        <option value="500">500</option>
                                                        <option value="600">600</option>
                                                        <option value="700">700</option>
                                                        <option value="800">800</option>
                                                    </select>
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatText className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Featured_Profile_Card_Section_Name_Font_Size} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Name_Font_Size', e.target.value)} />
                                                </div>

                                                <div className={aligntext[0] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["left", aligntext[1], aligntext[2]])}  >
                                                    <FaAlignLeft />
                                                </div>
                                                <div className={aligntext[0] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["center", aligntext[1], aligntext[2]])}>
                                                    <FaAlignCenter />
                                                </div>
                                                <div className={aligntext[0] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["right", aligntext[1], aligntext[2]])}>
                                                    <FaAlignRight />
                                                </div>
                                                <div className={aligntext[0] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["justify", aligntext[1], aligntext[2]])}>
                                                    <FaAlignJustify />
                                                </div>


                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <MdTextFormat className='w-[30%] text-[30px]' />
                                                    <select defaultValue={statedata.Featured_Profile_Card_Section_Name_Text_Decoration} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Name_Text_Decoration', e.target.value)}>
                                                        <option value="None">None</option>
                                                        <option value="underline">Underline</option>
                                                        <option value="line-through">Upperline</option>
                                                        <option value="overline">Overline</option>
                                                    </select>
                                                </div>

                                                <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                    <input defaultValue={statedata.Featured_Profile_Card_Section_Home_Name_Color} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Home_Name_Color', e.target.value)} />
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatLineHeight className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Featured_Profile_Card_Section_Name_Text_Line} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Name_Text_Line', e.target.value)} />
                                                </div>
                                            </div>
                                            <textarea type="text" defaultValue={statedata.Featured_Profile_Card_Section_Name_Heading} className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Name_Heading', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Sub_Home_Heading}
                                            </div>
                                        </div>
                                    </section>

                                    <section className='w-[48%]'>

                                        <label htmlFor="" className=''>
                                            Age
                                        </label>
                                        <div className='w-[100%] mt-[5px]'>
                                            <div className='flex justify-between'>
                                                <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <FaBold />
                                                    <select defaultValue={statedata.Featured_Profile_Age_Text_Bold} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Age_Text_Bold', e.target.value)}>
                                                        <option>bold</option>
                                                        <option value="100">100</option>
                                                        <option value="200">200</option>
                                                        <option value="300">300</option>
                                                        <option value="400">400</option>
                                                        <option value="500">500</option>
                                                        <option value="600">600</option>
                                                        <option value="700">700</option>
                                                        <option value="800">800</option>
                                                    </select>
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatText className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Featured_Profile_Age_Font_Size} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Age_Font_Size', e.target.value)} />
                                                </div>

                                                <div className={aligntext[1] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "left", aligntext[2]])}  >
                                                    <FaAlignLeft />
                                                </div>
                                                <div className={aligntext[1] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "center", aligntext[2]])}>
                                                    <FaAlignCenter />
                                                </div>
                                                <div className={aligntext[1] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "right", aligntext[2]])}>
                                                    <FaAlignRight />
                                                </div>
                                                <div className={aligntext[1] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "justify", aligntext[2]])}>
                                                    <FaAlignJustify />
                                                </div>


                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <MdTextFormat className='w-[30%] text-[30px]' />
                                                    <select defaultValue={statedata.Featured_Profile_Age_Text_Decoration} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Age_Text_Decoration', e.target.value)}>
                                                        <option value="None">None</option>
                                                        <option value="underline">Underline</option>
                                                        <option value="line-through">Upperline</option>
                                                        <option value="overline">Overline</option>
                                                    </select>
                                                </div>

                                                <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                    <input defaultValue={statedata.Featured_Profile_Age_Color} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Featured_Profile_Age_Color', e.target.value)} />
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatLineHeight className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Featured_Profile_Age_Text_Line} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Age_Text_Line', e.target.value)} />
                                                </div>
                                            </div>
                                            <input type="number" defaultValue={statedata.Featured_Profile_Card_Section_Age_Heading} className='w-[100%] h-[60px] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Age_Heading', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Home_Heading}
                                            </div>
                                        </div>
                                    </section>




                                </section>

                                <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                    <section className='w-[48%]'>
                                        <label htmlFor="" className=''>
                                            Location
                                        </label>
                                        <div className='w-[100%] mt-[5px]'>
                                            <div className='flex justify-between'>
                                                <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <FaBold />
                                                    <select defaultValue={statedata.Featured_Profile_Location_Text_Bold} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Text_Bold', e.target.value)}>
                                                        <option>bold</option>
                                                        <option value="100">100</option>
                                                        <option value="200">200</option>
                                                        <option value="300">300</option>
                                                        <option value="400">400</option>
                                                        <option value="500">500</option>
                                                        <option value="600">600</option>
                                                        <option value="700">700</option>
                                                        <option value="800">800</option>
                                                    </select>
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatText className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Featured_Profile_Location_Font_Size} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Font_Size', e.target.value)} />
                                                </div>

                                                <div className={aligntext[2] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], aligntext[1], "left"])}  >
                                                    <FaAlignLeft />
                                                </div>
                                                <div className={aligntext[2] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], aligntext[1], "center"])}>
                                                    <FaAlignCenter />
                                                </div>
                                                <div className={aligntext[2] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], aligntext[1], "right"])}>
                                                    <FaAlignRight />
                                                </div>
                                                <div className={aligntext[2] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], aligntext[1], "justify"])}>
                                                    <FaAlignJustify />
                                                </div>


                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <MdTextFormat className='w-[30%] text-[30px]' />
                                                    <select defaultValue={statedata.Featured_Profile_Location_Text_Decoration} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Text_Decoration', e.target.value)}>
                                                        <option value="None">None</option>
                                                        <option value="underline">Underline</option>
                                                        <option value="line-through">Upperline</option>
                                                        <option value="overline">Overline</option>
                                                    </select>
                                                </div>

                                                <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                    <input defaultValue={statedata.Featured_Profile_Location_Color} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Color', e.target.value)} />
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatLineHeight className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Featured_Profile_Location_Text_Line} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Text_Line', e.target.value)} />
                                                </div>
                                            </div>
                                            <textarea type="text" defaultValue={statedata.Featured_Profile_Card_Section_Location_Heading} className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Location_Heading', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Sub_Home_Heading}
                                            </div>
                                        </div>
                                    </section>


                                    <section className='w-[48%]'>
                                        <label htmlFor="" className=''>
                                            Card Icon
                                        </label>
                                        <div className='w-[100%] mt-[5px] h-[95px] relative'>
                                            <input
                                                type="file"
                                                className='w-[100%] h-[95px] absolute p-2 rounded-[10px] border-[1px] border-[black] z-40 opacity-0'
                                                onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Image', e.target.files[0]) && setimgname(e.target.value)}
                                            />
                                            <div className='w-[100%] h-[100%] border-dashed border-[1px] bg-[#EAE8E8] rounded-[10px] border-[black] absolute top-[0px] z-[2] flex justify-center items-center'>
                                                <div className='flex justify-center items-center flex-col'>
                                                    <p className='text-center text-[20px]'> <FaFile /></p>
                                                    <p>{imgname.slice(11, 50)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>

                                <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>

                            </form >
                        </section >

                    </section>
                </section >
            </section >
            <Toaster />
        </>
    )
}
