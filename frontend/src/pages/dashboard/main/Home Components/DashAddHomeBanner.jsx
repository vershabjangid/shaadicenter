import React, { useState } from 'react'
import { FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaFile } from 'react-icons/fa'
import { CgFormatLineHeight, CgFormatText } from 'react-icons/cg'
import { FaAlignCenter } from 'react-icons/fa6'
import { MdTextFormat } from 'react-icons/md'
import { toFormData } from 'axios'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { api, getCookie } from '../../../../url/Url'
import { Loader } from '../../../../common/Loader'

export function DashAddHomeBanner() {
    let [imgname, setimgname] = useState("...........Upload Banner")
    let [loader, setloader] = useState(false)
    let [aligntext, setaligntext] = useState(["left", "left"])

    let formik = useFormik({
        initialValues: {
            Banner_direction: "",
            Banner_Image: "",
            Heading: "",
            Heading_Font_Bold: "",
            Heading_Font_Size: "",
            Heading_Text_Align: aligntext[0],
            Heading_Text_Decoration: "",
            Heading_Text_Color: "",
            Heading_Line_Height: "",
            Sub_Heading: "",
            Sub_Heading_Font_Bold: "",
            Sub_Heading_Font_Size: "",
            Sub_Heading_Text_Align: aligntext[1],
            Sub_Heading_Text_Decoration: "",
            Sub_Heading_Text_Color: "",
            Sub_Heading_Line_Height: ""
        },
        onSubmit: () => {
            formik.values.Heading_Text_Align = aligntext[0]
            formik.values.Sub_Heading_Text_Align = aligntext[1]
            insertdata(formik.values)
            setloader(true)
        }

    })
    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let insertdata = (value) => {
        try {
            api.post('/home-banner', toFormData(value), {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    console.log(res.data.Message)
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setloader(false)
                    }
                    else {
                        notificationerror(res.data.Message)
                        setloader(false)
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
            {
                loader ? <Loader /> :

                    <section className='w-[100%] py-4 border-[1px] bg-[white] my-[10px] p-2 rounded-[10px]'>
                        <section className='border-b-[2px] border-[black]'>
                            Add Home Banner
                        </section>

                        <form onSubmit={formik.handleSubmit}>
                            <section className='w-[100%] border-b-[2px] border-[black] pb-5'>
                                <section>
                                    <p className='mt-[20px] mb-[5px] text-[20px] font-[600]'>Banner section</p>
                                    <section className='flex justify-between'>
                                        <section className='w-[48%]'>

                                            <label htmlFor="">
                                                Banner direction
                                            </label>
                                            <select defaultValue={"Right"} className='border-[1px] border-[black] w-[100%] rounded-[5px] p-[5px]'
                                                onChange={(e) => formik.setFieldValue('Banner_direction', e.target.value)}
                                            >
                                                <option>Choose Side</option>
                                                <option value="right">Right</option>
                                                <option value="left">Left</option>
                                            </select>
                                        </section>


                                        <section className='w-[48%]'>

                                            <label htmlFor="" className=''>
                                                Upload Banner
                                            </label>
                                            <div className='w-[100%] mt-[5px] h-[95px] relative'>
                                                <input
                                                    type="file"
                                                    className='w-[100%] h-[95px] absolute p-2 rounded-[10px] border-[1px] border-[black] z-40 opacity-0'
                                                    onChange={(e) => formik.setFieldValue('Banner_Image', e.target.files[0]) && setimgname(e.target.value)}
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
                                </section>
                            </section>




                            <section className='w-[100%] border-b-[2px] border-[black] pb-5'>
                                <section>
                                    <p className='mt-[20px] mb-[5px] text-[20px] font-[600]'>Heading section</p>
                                    <section className='flex justify-between'>
                                        <section className='w-[48%]'>

                                            <label htmlFor="" className=''>
                                                Heading
                                            </label>
                                            <div className='w-[100%] mt-[5px]'>
                                                <div className='flex justify-between'>
                                                    <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                        <FaBold />
                                                        <select defaultValue={"700"} className='p-1 w-[100%] outline-none'
                                                            onChange={(e) => formik.setFieldValue('Heading_Font_Bold', e.target.value)}
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
                                                            onChange={(e) => formik.setFieldValue('Heading_Font_Size', e.target.value)}
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
                                                            onChange={(e) => formik.setFieldValue('Heading_Text_Decoration', e.target.value)}
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
                                                            onChange={(e) => formik.setFieldValue('Heading_Text_Color', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                        <CgFormatLineHeight className='text-[30px]' />
                                                        <input type='number'
                                                            defaultValue={"55"}
                                                            className='p-1 w-[80%] outline-none'
                                                            onChange={(e) => formik.setFieldValue('Heading_Line_Height', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <textarea type="text"
                                                    className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]'
                                                    onChange={(e) => formik.setFieldValue('Heading', e.target.value)}
                                                />
                                            </div>
                                        </section>



                                        <section className='w-[48%]'>

                                            <label htmlFor="" className=''>
                                                Sub  Heading
                                            </label>
                                            <div className='w-[100%] mt-[5px]'>
                                                <div className='flex justify-between'>
                                                    <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                        <FaBold />
                                                        <select defaultValue={"700"} className='p-1 w-[100%] outline-none'
                                                            onChange={(e) => formik.setFieldValue('Sub_Heading_Font_Bold', e.target.value)}
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
                                                            onChange={(e) => formik.setFieldValue('Sub_Heading_Font_Size', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className={aligntext[1] === "left" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                        onClick={() => setaligntext([aligntext[0], "left"])}
                                                    >
                                                        <FaAlignLeft />
                                                    </div>
                                                    <div className={aligntext[1] === "center" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                        onClick={() => setaligntext([aligntext[0], "center"])}
                                                    >
                                                        <FaAlignCenter />
                                                    </div>
                                                    <div className={aligntext[1] === "right" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                        onClick={() => setaligntext([aligntext[0], "right"])}
                                                    >

                                                        <FaAlignRight />
                                                    </div>
                                                    <div className={aligntext[1] === "justify" ? "text-[15px] text-white bg-[black]  border-[1px] px-2 border-[black] flex items-center" : "text-[15px]  border-[1px] px-2 border-[black] flex items-center"}
                                                        onClick={() => setaligntext([aligntext[0], "justify"])}
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
                                                            onChange={(e) => formik.setFieldValue('Sub_Heading_Text_Decoration', e.target.value)}
                                                        >
                                                            <option value="None">None</option>
                                                            <option value="underline">Underline</option>
                                                            <option value="line-through">Upperline</option>
                                                            <option value="overline">Overline</option>
                                                        </select>
                                                    </div>

                                                    <div className='w-[10%] border-[1px] border-[black] text-[18px] flex items-center'>
                                                        <input
                                                            defaultValue={"#757575"}
                                                            className='p-1 w-[100%] h-[30px] outline-none'
                                                            type='color'
                                                            onChange={(e) => formik.setFieldValue('Sub_Heading_Text_Color', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                        <CgFormatLineHeight className='text-[30px]' />
                                                        <input type='number'
                                                            defaultValue={"24"}
                                                            className='p-1 w-[80%] outline-none'
                                                            onChange={(e) => formik.setFieldValue('Sub_Heading_Line_Height', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <textarea type="text"
                                                    className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]'
                                                    onChange={(e) => formik.setFieldValue('Sub_Heading', e.target.value)}
                                                />
                                            </div>
                                        </section>

                                    </section>
                                </section>
                            </section>
                            <section className='my-[10px]'>
                                <button type='submit' className='bg-[#0095ff] px-3 py-2 rounded-[10px] text-[white]'>Submit</button>
                            </section>
                        </form>
                    </section>

            }

        </>

    )
}
