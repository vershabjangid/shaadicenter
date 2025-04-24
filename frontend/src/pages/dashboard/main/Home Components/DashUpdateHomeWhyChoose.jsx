import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { toFormData } from 'axios';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaFile } from 'react-icons/fa'
import { CgFormatLineHeight, CgFormatText } from 'react-icons/cg'
import { MdTextFormat } from 'react-icons/md'
import { DashboardHeader } from '../../../../common/DashboardHeader';
import { DashboardSidebar } from '../../../../common/DashboardSidebar';
import { api, getCookie } from '../../../../url/Url';

export function DashUpdateHomeWhyChoose() {
    let location = useLocation();
    let statedata = location.state


    let [aligntext, setaligntext] = useState([statedata.Why_Choose_Card_Section_Head_Text_Align, statedata.Why_Choose_Sub_Head_Text_Align])
    let [imgname, setimgname] = useState("...........Upload Banner")
    let formik = useFormik({
        initialValues: {
            _id: statedata._id,
            Why_Choose_Card_Icon: "",
            Why_Choose_Card_Section_Head_Text_Bold: statedata.Why_Choose_Card_Section_Head_Text_Bold || "",
            Why_Choose_Card_Section_Head_Font_Size: statedata.Why_Choose_Card_Section_Head_Font_Size || "",
            Why_Choose_Card_Section_Head_Text_Align: aligntext[0],
            Why_Choose_Card_Section_Head_Text_Decoration: statedata.Why_Choose_Card_Section_Head_Text_Decoration || "",
            Why_Choose_Card_Section_Home_Heading_Color: statedata.Why_Choose_Card_Section_Home_Heading_Color || "",
            Why_Choose_Card_Section_Head_Text_Line: statedata.Why_Choose_Card_Section_Head_Text_Line || "",
            Why_Choose_Card_Section_Home_Heading: statedata.Why_Choose_Card_Section_Home_Heading || "",
            Why_Choose_Sub_Head_Text_Bold: statedata.Why_Choose_Sub_Head_Text_Bold || "",
            Why_Choose_Sub_Head_Font_Size: statedata.Why_Choose_Sub_Head_Font_Size || "",
            Why_Choose_Sub_Head_Text_Align: aligntext[1],
            Why_Choose_Sub_Head_Text_Decoration: statedata.Why_Choose_Sub_Head_Text_Decoration || "",
            Why_Choose_Sub_Home_Heading_Color: statedata.Why_Choose_Sub_Home_Heading_Color || "",
            Why_Choose_Sub_Head_Text_Line: statedata.Why_Choose_Sub_Head_Text_Line || "",
            Why_Choose_Card_Section_Sub_Home_Heading: statedata.Why_Choose_Card_Section_Sub_Home_Heading || ""

        },
        onSubmit: () => {
            formik.values.Why_Choose_Card_Section_Head_Text_Align = aligntext[0]
            formik.values.Why_Choose_Sub_Head_Text_Align = aligntext[1]
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let insertdata = (value) => {
        try {
            api.put('/update-home-why-choose', toFormData(value), {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        navigate('/home-layout')
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
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red]'>

                        <section className='form_shadow mt-[20px] w-[100%] p-2 bg-[white] rounded-[8px]'>
                            <p className='text-[15px]'>ADD HOME WHY CHOOSE</p>

                            <form onSubmit={formik.handleSubmit}>

                                <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>
                                    <section className='w-[48%]'>

                                        <label htmlFor="" className=''>
                                            Card Heading
                                        </label>
                                        <div className='w-[100%] mt-[5px]'>
                                            <div className='flex justify-between'>
                                                <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <FaBold />
                                                    <select defaultValue={statedata.Why_Choose_Card_Section_Head_Text_Bold} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Head_Text_Bold', e.target.value)}>
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
                                                    <input type='number' defaultValue={statedata.Why_Choose_Card_Section_Head_Font_Size} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Head_Font_Size', e.target.value)} />
                                                </div>

                                                <div className={aligntext[0] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["left", aligntext[1]])}  >
                                                    <FaAlignLeft />
                                                </div>
                                                <div className={aligntext[0] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["center", aligntext[1]])}>
                                                    <FaAlignCenter />
                                                </div>
                                                <div className={aligntext[0] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["right", aligntext[1]])}>
                                                    <FaAlignRight />
                                                </div>
                                                <div className={aligntext[0] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext(["justify", aligntext[1]])}>
                                                    <FaAlignJustify />
                                                </div>


                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <MdTextFormat className='w-[30%] text-[30px]' />
                                                    <select defaultValue={statedata.Why_Choose_Card_Section_Head_Text_Decoration} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Head_Text_Decoration', e.target.value)}>
                                                        <option value="None">None</option>
                                                        <option value="underline">Underline</option>
                                                        <option value="line-through">Upperline</option>
                                                        <option value="overline">Overline</option>
                                                    </select>
                                                </div>

                                                <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                    <input defaultValue={statedata.Why_Choose_Card_Section_Home_Heading_Color} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Home_Heading_Color', e.target.value)} />
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatLineHeight className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Why_Choose_Card_Section_Head_Text_Line} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Head_Text_Line', e.target.value)} />
                                                </div>
                                            </div>
                                            <textarea type="text" defaultValue={statedata.Why_Choose_Card_Section_Home_Heading} className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Home_Heading', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Sub_Home_Heading}
                                            </div>
                                        </div>
                                    </section>


                                    <section className='w-[48%]'>

                                        <label htmlFor="" className=''>
                                            Card Content
                                        </label>
                                        <div className='w-[100%] mt-[5px]'>
                                            <div className='flex justify-between'>
                                                <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <FaBold />
                                                    <select defaultValue={statedata.Why_Choose_Sub_Head_Text_Bold} className='p-1 w-[100%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Sub_Head_Text_Bold', e.target.value)}>
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
                                                    <input type='number' defaultValue={statedata.Why_Choose_Sub_Head_Font_Size} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Sub_Head_Font_Size', e.target.value)} />
                                                </div>

                                                <div className={aligntext[1] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "left"])}  >
                                                    <FaAlignLeft />
                                                </div>
                                                <div className={aligntext[1] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "center"])}>
                                                    <FaAlignCenter />
                                                </div>
                                                <div className={aligntext[1] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "right"])}>
                                                    <FaAlignRight />
                                                </div>
                                                <div className={aligntext[1] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"} onClick={() => setaligntext([aligntext[0], "justify"])}>
                                                    <FaAlignJustify />
                                                </div>


                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <MdTextFormat className='w-[30%] text-[30px]' />
                                                    <select defaultValue={statedata.Why_Choose_Sub_Head_Text_Decoration} className='p-1 w-[70%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Sub_Head_Text_Decoration', e.target.value)}>
                                                        <option value="None">None</option>
                                                        <option value="underline">Underline</option>
                                                        <option value="line-through">Upperline</option>
                                                        <option value="overline">Overline</option>
                                                    </select>
                                                </div>

                                                <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                    <input defaultValue={statedata.Why_Choose_Sub_Home_Heading_Color} className='p-1 w-[100%] h-[30px] outline-none' type='color' onChange={(e) => formik.setFieldValue('Why_Choose_Sub_Home_Heading_Color', e.target.value)} />
                                                </div>

                                                <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                    <CgFormatLineHeight className='text-[30px]' />
                                                    <input type='number' defaultValue={statedata.Why_Choose_Sub_Head_Text_Line} className='p-1 w-[80%] outline-none' onChange={(e) => formik.setFieldValue('Why_Choose_Sub_Head_Text_Line', e.target.value)} />
                                                </div>
                                            </div>
                                            <textarea type="text" defaultValue={statedata.Why_Choose_Card_Section_Sub_Home_Heading} className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]' onChange={(e) => formik.setFieldValue('Why_Choose_Card_Section_Sub_Home_Heading', e.target.value)} />
                                            <div className='text-[red]'>
                                                {formik.errors.Home_Heading}
                                            </div>
                                        </div>
                                    </section>




                                </section>

                                <section className='w-[100%] flex justify-between items-start border-[1px] my-[20px]'>
                                    <section className='w-[48%]'>
                                        <label htmlFor="" className=''>
                                            Card Icon
                                        </label>
                                        <div className='w-[100%] mt-[5px] h-[95px] relative'>
                                            <input
                                                type="file"
                                                className='w-[100%] h-[95px] absolute p-2 rounded-[10px] border-[1px] border-[black] z-40 opacity-0'
                                                onChange={(e) => formik.setFieldValue('Why_Choose_Card_Icon', e.target.files[0]) && setimgname(e.target.value)}
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
                </section>
            </section>
            <Toaster />
        </>
    )
}
