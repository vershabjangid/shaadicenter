import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { CgFormatLineHeight, CgFormatText } from 'react-icons/cg'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaFile } from 'react-icons/fa'
import { MdTextFormat } from 'react-icons/md'
import { api, getCookie } from '../../../../url/Url'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'



export function DashAddSubParagraph() {

    let [aligntext, setaligntext] = useState(["left", "left"])
    let [imgname, setimgname] = useState("...........Upload Banner")
    let formik = useFormik({
        initialValues: {
            AboutSubParagraphHeading: "",
            AboutParagraphSubHeadingFontBold: "",
            AboutParagraphSubHeadingFontSize: "",
            AboutParagraphSubHeadingFontAlign: "",
            AboutParagraphSubHeadingTextDecoration: "",
            AboutParagraphSubHeadingFontColor: "",
            AboutParagraphSubHeadingLineHeight: ""
        },

        onSubmit: (value, { resetForm }) => {
            formik.values.AboutParagraphHeadingFontAlign = aligntext[0];
            formik.values.AboutParagraphSubHeadingFontAlign = aligntext[1];
            insertdata(formik.values)
            resetForm({
                AboutSubParagraphHeading: "",
                AboutParagraphSubHeadingFontBold: "",
                AboutParagraphSubHeadingFontSize: "",
                AboutParagraphSubHeadingFontAlign: "",
                AboutParagraphSubHeadingTextDecoration: "",
                AboutParagraphSubHeadingFontColor: "",
                AboutParagraphSubHeadingLineHeight: ""
            })
        }
    })

    let notifysuccess = (succes) => toast.success(succes)
    let notifyerror = (error) => toast.error(error)
    let insertdata = (value) => {
        api.post('/add-about-sub-paragraph', toFormData(value), {
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

    let [headingoption, setheadingoption] = useState([])
    let viewdata = () => {
        api.get('/view-about-paragraph')
            .then((res) => {
                setheadingoption(res.data.viewdata)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        viewdata();
    }, [])

    return (
        <>
            <section className='w-[100%] py-4 border-[1px] bg-[white] my-[10px] p-2 rounded-[10px]'>
                <section className='border-b-[2px] border-[black]'>
                    Add About Sub Paragraph
                </section>

                <form onSubmit={formik.handleSubmit}>
                    <section className='w-[100%] border-b-[2px] border-[black] pb-5'>
                        <section>


                            <section className='flex justify-between my-4'>
                                <section className='w-[48%]'>

                                    <label htmlFor="" className=''>
                                        About Sub Paragraph
                                    </label>
                                    <div className='w-[100%] mt-[5px]'>
                                        <div className='flex justify-between'>
                                            <div className='border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                <FaBold />
                                                <select defaultValue={"700"} className='p-1 w-[100%] outline-none'
                                                    onChange={(e) => formik.setFieldValue('AboutParagraphSubHeadingFontBold', e.target.value)}
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
                                                    onChange={(e) => formik.setFieldValue('AboutParagraphSubHeadingFontSize', e.target.value)}
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
                                                    onChange={(e) => formik.setFieldValue('AboutParagraphSubHeadingTextDecoration', e.target.value)}
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
                                                    onChange={(e) => formik.setFieldValue('AboutParagraphSubHeadingFontColor', e.target.value)}
                                                />
                                            </div>

                                            <div className='w-[15%] border-[1px] ps-2 border-[black] text-[18px] flex items-center'>
                                                <CgFormatLineHeight className='text-[30px]' />
                                                <input type='number'
                                                    defaultValue={"55"}
                                                    className='p-1 w-[80%] outline-none'
                                                    onChange={(e) => formik.setFieldValue('AboutParagraphSubHeadingLineHeight', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <textarea type="text"
                                            className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]'
                                            onChange={(e) => formik.setFieldValue('AboutParagraphSubHeading', e.target.value)}
                                        />
                                    </div>
                                </section>





                                <section className='w-[48%]'>

                                    <label htmlFor="" className=''>
                                        Choose Heading Section
                                    </label>
                                    <div className='w-[100%] mt-[5px]'>

                                        <select type="text"
                                            className='w-[100%] rounded-[5px] p-[5px] border-[1px] border-[black]'
                                            onChange={(e) => formik.setFieldValue('AboutSubParagraphHeading', e.target.value)}
                                        >
                                            <option>Choose Option</option>
                                            {
                                                headingoption.length === 0 ? <option>No Data Found</option> : headingoption.map((items, index) => {
                                                    return (
                                                        <option value={items.AboutParagraphHeading}>{items.AboutParagraphHeading}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
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
