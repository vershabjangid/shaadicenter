import { useFormik } from 'formik'
import React, { useState } from 'react'
import { CgFormatLineHeight, CgFormatText } from 'react-icons/cg'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaFile } from 'react-icons/fa'
import { MdTextFormat } from 'react-icons/md'
import { api, getCookie } from '../../../../url/Url'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export function DashAddAboutBanner() {
    let [aligntext, setaligntext] = useState(["center"])
    let [imgname, setimgname] = useState("...........Upload Banner")

    let formik = useFormik({
        initialValues: {
            AboutBanner: "",
            AboutBanner_Heading: "",
            AboutBanner_Overlay: "",
            AboutBanner_Overlay_Transparency: "",
            AboutHeading_Font_Bold: "",
            AboutHeading_Font_Size: "",
            AboutHeading_Text_Align: aligntext[0],
            AboutHeading_Text_Decoration: "",
            AboutHeading_Text_Color: "",
            AboutHeading_Line_Height: ""
        },

        onSubmit: () => {
            formik.AboutHeading_Text_Align = aligntext[0]
            insertdata(formik.values)
        }
    })

    let notifysuccess = (succes) => toast.success(succes)
    let notifyerror = (error) => toast.error(error)
    let insertdata = (value) => {
        try {
            api.post('/add-about-banner', toFormData(value), {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notifysuccess(res.data.Message)
                    }
                    else {
                        notifyerror(res.data.Message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section className='w-[100%] py-4 border-[1px] bg-[white] my-[10px] p-2 rounded-[10px]'>
                <section className='border-b-[2px] border-[black]'>
                    Add About Banner
                </section>

                <form onSubmit={formik.handleSubmit}>
                    <section className='w-[100%] border-b-[2px] border-[black] pb-5'>
                        <section>
                            <p className='mt-[20px] mb-[5px] text-[20px] font-[600]'>Banner section</p>
                            <section className='flex justify-between mb-5'>


                                <section className='w-[48%]'>

                                    <label htmlFor="" className=''>
                                        Upload Banner
                                    </label>
                                    <div className='w-[100%] mt-[5px] h-[95px] relative'>
                                        <input
                                            type="file"
                                            className='w-[100%] h-[95px] absolute p-2 rounded-[10px] border-[1px] border-[black] z-40 opacity-0'
                                            onChange={(e) => formik.setFieldValue('AboutBanner', e.target.files[0]) && setimgname(e.target.value)}
                                        />


                                        <div className='w-[100%] h-[100%] border-dashed border-[1px] bg-[#EAE8E8] rounded-[10px] border-[black] absolute top-[0px] z-[2] flex justify-center items-center'>
                                            <div className='flex justify-center items-center flex-col'>
                                                <p className='text-center text-[20px]'> <FaFile /></p>
                                                <p>{imgname.slice(11, 50)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>


                                <section className='w-[48%]'>

                                    <label htmlFor="" className=''>
                                        About Banner Heading
                                    </label>
                                    <div className='w-[100%] mt-[5px]'>
                                        <div className='flex justify-between'>
                                            <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                <FaBold />
                                                <select defaultValue={"700"} className='p-1 w-[100%] outline-none'
                                                    onChange={(e) => formik.setFieldValue('AboutHeading_Font_Bold', e.target.value)}
                                                >
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
                                                <input type='number' defaultValue={"45"} className='p-1 w-[80%] outline-none'
                                                    onChange={(e) => formik.setFieldValue('AboutHeading_Font_Size', e.target.value)}
                                                />
                                            </div>

                                            <div className={aligntext[0] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                onClick={() => setaligntext(["left", aligntext[1]])}
                                            >
                                                <FaAlignLeft />
                                            </div>
                                            <div className={aligntext[0] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                onClick={() => setaligntext(["center", aligntext[1]])}
                                            >
                                                <FaAlignCenter />
                                            </div>
                                            <div className={aligntext[0] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                onClick={() => setaligntext(["right", aligntext[1]])}
                                            >

                                                <FaAlignRight />
                                            </div>
                                            <div className={aligntext[0] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                onClick={() => setaligntext(["justify", aligntext[1]])}
                                            >
                                                <FaAlignJustify />
                                            </div>


                                            <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                <MdTextFormat
                                                    className='w-[30%] text-[30px]'
                                                />
                                                <select
                                                    defaultValue={"None"}
                                                    className='p-1 w-[70%] outline-none'
                                                    onChange={(e) => formik.setFieldValue('AboutHeading_Text_Decoration', e.target.value)}
                                                >
                                                    <option value="None">None</option>
                                                    <option value="underline">Underline</option>
                                                    <option value="line-through">Upperline</option>
                                                    <option value="overline">Overline</option>
                                                </select>
                                            </div>

                                            <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                <input
                                                    defaultValue={"#000000"}
                                                    className='p-1 w-[100%] h-[30px] outline-none'
                                                    type='color'
                                                    onChange={(e) => formik.setFieldValue('AboutHeading_Text_Color', e.target.value)}
                                                />
                                            </div>

                                            <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                <CgFormatLineHeight className='text-[30px]' />
                                                <input type='number'
                                                    defaultValue={"55"}
                                                    className='p-1 w-[80%] outline-none'
                                                    onChange={(e) => formik.setFieldValue('AboutHeading_Line_Height', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <textarea type="text"
                                            className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]'
                                            onChange={(e) => formik.setFieldValue('AboutBanner_Heading', e.target.value)}
                                        />
                                    </div>
                                </section>


                            </section>

                            <section className='flex justify-between my-4'>
                                <section className='w-[48%]'>

                                    <label htmlFor="">
                                        Banner Overlay
                                    </label>
                                    <input type='color' className='border-[0px] w-[100%] rounded-[5px] p-[5px]'
                                        onChange={(e) => formik.setFieldValue('AboutBanner_Overlay', e.target.value)}
                                    />

                                </section>


                                <section className='w-[48%]'>
                                    <label htmlFor="">
                                        Overlay Transparency
                                    </label>
                                    <input type='range' min={0} max={100} defaultValue={50} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]'
                                        onChange={(e) => formik.setFieldValue('AboutBanner_Overlay_Transparency', e.target.value)}
                                    />
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className='mt-3'>
                        <button className='px-4 py-2 bg-sky-300 rounded-[10px] text-white'>Submit</button>
                    </section>

                </form>
            </section>
            <Toaster /> 
        </>
    )
}
