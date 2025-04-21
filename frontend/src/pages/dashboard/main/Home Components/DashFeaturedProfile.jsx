import React, { useState } from 'react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaFile } from 'react-icons/fa'
import { CgFormatLineHeight, CgFormatText } from 'react-icons/cg'
import { MdTextFormat } from 'react-icons/md'
import { toFormData } from 'axios'
import { api, getCookie } from '../../../../url/Url'

export function DashFeaturedProfile() {
    let [aligntext, setaligntext] = useState(["left", "left", "left"])
    let [imgname, setimgname] = useState("...........Upload Banner")
    let formik = useFormik({
        initialValues: {
            Featured_Profile_Card_Image: "",
            Featured_Profile_Card_Section_Name_Text_Bold: "400" || "",
            Featured_Profile_Card_Section_Name_Font_Size: "20" || "",
            Featured_Profile_Card_Section_Name_Text_Align: aligntext[0],
            Featured_Profile_Card_Section_Name_Text_Decoration: "none" || "",
            Featured_Profile_Card_Section_Home_Name_Color: "red" || "",
            Featured_Profile_Card_Section_Name_Text_Line: "30" || "",
            Featured_Profile_Card_Section_Name_Heading: "",

            Featured_Profile_Age_Text_Bold: "300" || "",
            Featured_Profile_Age_Font_Size: "20" || "",
            Featured_Profile_Age_Text_Align: aligntext[1],
            Featured_Profile_Age_Text_Decoration: "none" || "",
            Featured_Profile_Age_Color: "#252525" || "",
            Featured_Profile_Age_Text_Line: "30" || "",
            Featured_Profile_Card_Section_Age_Heading: "",


            Featured_Profile_Location_Text_Bold: "400" || "",
            Featured_Profile_Location_Font_Size: "20" || "",
            Featured_Profile_Location_Text_Align: aligntext[2],
            Featured_Profile_Location_Text_Decoration: "none" || "",
            Featured_Profile_Location_Color: "#3D3D3D" || "",
            Featured_Profile_Location_Text_Line: "30" || "",
            Featured_Profile_Card_Section_Location_Heading: ""

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
    let insertdata = (value) => {
        try {
            api.post('/add-home-featured', toFormData(value), {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
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
            <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                <p className='text-[15px]'>ADD FEATURED PROFILE</p>

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
                                        <select defaultValue={"500"} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Head_Text_Bold', e.target.value)}>
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
                                        <input type='number' defaultValue={"20"} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Head_Font_Size', e.target.value)} />
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
                                        <select defaultValue={"None"} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Head_Text_Decoration', e.target.value)}>
                                            <option value="None">None</option>
                                            <option value="underline">Underline</option>
                                            <option value="line-through">Upperline</option>
                                            <option value="overline">Overline</option>
                                        </select>
                                    </div>

                                    <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                        <input defaultValue={"#000000"} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Home_Heading_Color', e.target.value)} />
                                    </div>

                                    <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                        <CgFormatLineHeight className='text-[30px]' />
                                        <input type='number' defaultValue={"30"} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Head_Text_Line', e.target.value)} />
                                    </div>
                                </div>
                                <textarea type="text" className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Name_Heading', e.target.value)} />
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
                                        <select defaultValue={"700"} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Sub_Head_Text_Bold', e.target.value)}>
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
                                        <input type='number' defaultValue={"45"} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Sub_Head_Font_Size', e.target.value)} />
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
                                        <select defaultValue={"None"} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Sub_Head_Text_Decoration', e.target.value)}>
                                            <option value="None">None</option>
                                            <option value="underline">Underline</option>
                                            <option value="line-through">Upperline</option>
                                            <option value="overline">Overline</option>
                                        </select>
                                    </div>

                                    <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                        <input defaultValue={"#000000"} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Featured_Profile_Sub_Home_Heading_Color', e.target.value)} />
                                    </div>

                                    <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                        <CgFormatLineHeight className='text-[30px]' />
                                        <input type='number' defaultValue={"40"} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Sub_Head_Text_Line', e.target.value)} />
                                    </div>
                                </div>
                                <input type="number" className='w-[100%] h-[60px] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Age_Heading', e.target.value)} />
                                <div className='text-[red]'>
                                    {formik.errors.Home_Heading}
                                </div>
                            </div>
                        </section>




                    </section>

                    <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                        <section className='w-[48%]'>

                            <label htmlFor="" className=''>
                                Designation
                            </label>
                            <div className='w-[100%] mt-[5px]'>
                                <div className='flex justify-between'>
                                    <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                        <FaBold />
                                        <select defaultValue={"500"} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Text_Bold', e.target.value)}>
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
                                        <input type='number' defaultValue={"20"} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Font_Size', e.target.value)} />
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
                                        <select defaultValue={"None"} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Text_Decoration', e.target.value)}>
                                            <option value="None">None</option>
                                            <option value="underline">Underline</option>
                                            <option value="line-through">Upperline</option>
                                            <option value="overline">Overline</option>
                                        </select>
                                    </div>

                                    <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                        <input defaultValue={"#000000"} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Color', e.target.value)} />
                                    </div>

                                    <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                        <CgFormatLineHeight className='text-[30px]' />
                                        <input type='number' defaultValue={"30"} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Featured_Profile_Location_Text_Line', e.target.value)} />
                                    </div>
                                </div>
                                <textarea type="text" className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Featured_Profile_Card_Section_Location_Heading', e.target.value)} />
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
        </>
    )
}
