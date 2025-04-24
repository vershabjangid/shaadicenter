import React, { useEffect, useState } from 'react'
import { Header } from '../../../../common/Header'
import { Loader } from '../../../../common/Loader'
import { Footer } from '../../../../common/Footer'
import banner from '../../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import { api, getCookie } from '../../../../url/Url'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { RiDeleteBin5Fill } from 'react-icons/ri'
export function AboutLayout() {
    let [loader, setloader] = useState(false)


    let viewalldata = async () => {
        try {
            let [aboutbanner, aboutparagraph, aboutsubparagraph] = await Promise.all([
                api.get('/view-about-banner'),
                api.get('/view-about-paragraph'),
                api.get('/view-about-sub-paragraph')
            ])

            return {
                aboutbannerdata: aboutbanner.data,
                imageurl: aboutbanner.data.url,
                aboutparagraphs: aboutparagraph.data,
                aboutsubparagraphs: aboutsubparagraph.data
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let [aboutbannerdata, setbannerdata] = useState([])
    let [aboutparagraphdata, setaboutparagraphdata] = useState([])
    let [aboutsubparagraph, setaboutsubparagraph] = useState([])
    let [imgurl, setimgurl] = useState([])
    let finalfetch = () => {
        viewalldata()
            .then((res) => {
                setbannerdata(res.aboutbannerdata.viewdata)
                setaboutparagraphdata(res.aboutparagraphs.viewdata)
                setaboutsubparagraph(res.aboutsubparagraphs.viewdata)
                setimgurl(res.imageurl)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        finalfetch();
    }, [])


    let navigate = useNavigate();
    let updatedata = (value) => {
        console.log(value)
        if (value.AboutBanner) {
            navigate('/dash-updateaboutbanner', { state: value })
        }
        else if (value.AboutParagraphBanner || value.AboutParagraphHeading) {
            navigate('/dash-updateaboutparagraph', { state: value })
        }
        else if (value.AboutSubParagraphHeading) {
            navigate('/dash-updateaboutsubparagraph', { state: value })
        }
    }

    let [modal, setmodal] = useState(false);
    let [modaldata, setmodaldata] = useState("");

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let deletedata = (value) => {
        if (value.AboutParagraphBanner || value.AboutParagraphHeading) {
            try {
                api.delete('/delete-about-paragraph', {
                    data: value,
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                })
                    .then((res) => {
                        if (res.data.Status === 1) {
                            notificationsuccess(res.data.Message)
                            finalfetch()
                            setloader(false)
                            setmodal(false)
                        }
                        else {
                            notificationerror(res.data.Message)
                            setloader(false)
                            setmodal(false)
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
        else if (value.AboutSubParagraphHeading) {
            try {
                api.delete('/delete-about-sub-paragraph', {
                    data: value,
                    headers: {
                        Authorization: getCookie('AdminToken')
                    }
                })
                    .then((res) => {
                        if (res.data.Status === 1) {
                            notificationsuccess(res.data.Message)
                            finalfetch()
                            setloader(false)
                            setmodal(false)
                        }
                        else {
                            notificationerror(res.data.Message)
                            setloader(false)
                            setmodal(false)
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
    }
    return (
        <>
            {
                modal ? <section className='w-[100%] h-[100vh] fixed z-[60] bg-[#ffffff98] top-0 left-0 flex justify-center items-center'>
                    <div className='w-[450px] border-[1px] border-[black] p-2 py-5 bg-[white] text-center rounded-[10px]'>
                        <p className='text-[22px]'>Are Your Sure?</p>
                        <div className='flex justify-evenly mt-[20px]'>
                            <button className='bg-[green] text-[white] px-5 py-3 rounded-[10px]' onClick={() => setmodal(false)}>
                                Decline
                            </button>

                            <button className='bg-[red] text-[white] px-5 py-3 rounded-[10px]' onClick={() => deletedata(modaldata)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </section> : null
            }
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%]'>
                            {
                                aboutbannerdata.length === 0 ?

                                    <div className='w-[100%] h-[100vh] bg-[#9d9d9d] flex justify-center items-center'>No Data Found</div>
                                    :

                                    aboutbannerdata.map((items, index) => {
                                        return (
                                            <section className='w-[100%] h-[100vh] mb-6 relative flex justify-center items-center'>
                                                <div className='absolute right-[20px] top-[20px] text-[25px]' style={{ color: items.AboutHeading_Text_Color, zIndex: "9999" }} onClick={() => updatedata(items)}>
                                                    <FaEdit />
                                                </div>
                                                <h1 className='w-[100%]' style={{ zIndex: "9", fontWeight: items.AboutHeading_Font_Bold, fontSize: items.AboutHeading_Font_Size + 'px', textAlign: items.AboutHeading_Text_Align, textDecoration: items.AboutHeading_Text_Decoration, color: items.AboutHeading_Text_Color, lineHeight: items.AboutHeading_Line_Height + 'px' }}>{items.AboutBanner_Heading}</h1>
                                                <section className='w-[100%] h-[100%] absolute bg-[#ffffff59] flex justify-center items-center'>
                                                    <img src={imgurl + items.AboutBanner} alt="" className='w-[100%] h-[100%]' />
                                                </section>
                                                <section className='w-[100%] h-[100%] absolute flex justify-center items-center ' style={{ background: items.AboutBanner_Overlay, filter: `Opacity(${items.AboutBanner_Overlay_Transparency}%)` }}>
                                                </section>
                                            </section>
                                        )
                                    })

                            }




                            {
                                aboutparagraphdata.map((items, index) => {
                                    if (!items.AboutParagraphBanner) {
                                        return (
                                            <>
                                                <section className='w-[95%] m-auto px-5 py-3 mt-3'>
                                                    <section className=' w-[100%] h-[100%] rounded-[15px] flex items-center'>
                                                        <section className='w-[100%] mx-3 relative'>
                                                            <div className='absolute right-[0px] top-[-30px] text-[25px] flex' style={{ color: "black", zIndex: "9999" }} >
                                                                <FaEdit onClick={() => updatedata(items)} />
                                                                <RiDeleteBin5Fill className=' text-[25px] text-[red] ms-3' onClick={() => setmodal(true) || setmodaldata(items)} />
                                                            </div>
                                                            <p className='mb-2' style={{ fontWeight: items.AboutParagraphHeadingFontBold, fontSize: items.AboutParagraphHeadingFontSize + 'px', textAlign: items.AboutParagraphHeadingFontAlign, textDecoration: items.AboutParagraphHeadingTextDecoration, color: items.AboutParagraphHeadingFontColor, lineHeight: items.AboutParagraphHeadingLineHeight + 'px' }}>{items.AboutParagraphHeading}</p>
                                                            {
                                                                aboutsubparagraph.map((item, index) => {
                                                                    return (
                                                                        items.AboutParagraphHeading === item.AboutSubParagraphHeading ?
                                                                            <div className=' relative'>
                                                                                <div className='absolute right-[0px] top-[-30px] text-[25px] flex' style={{ color: "black", zIndex: "9999" }} >
                                                                                    <FaEdit onClick={() => updatedata(item)} />
                                                                                    <RiDeleteBin5Fill className=' text-[25px] text-[red] ms-3' onClick={() => setmodal(true) || setmodaldata(item)} />
                                                                                </div>
                                                                                <p className='mt-[20px]' style={{ fontWeight: item.AboutParagraphSubHeadingFontBold, fontSize: item.AboutParagraphSubHeadingFontSize + 'px', textAlign: item.AboutParagraphSubHeadingFontAlign, textDecoration: item.AboutParagraphSubHeadingTextDecoration, color: item.AboutParagraphSubHeadingFontColor, lineHeight: item.AboutParagraphSubHeadingLineHeight + 'px' }}>{item.AboutParagraphSubHeading}</p>
                                                                            </div>
                                                                            :
                                                                            null

                                                                    )
                                                                })
                                                            }
                                                        </section>
                                                    </section>
                                                </section>
                                            </>
                                        )

                                    }
                                    else {
                                        return (
                                            <section className='w-[95%] m-auto  py-3 mt-3'>
                                                {
                                                    index % 2 === 0 ?
                                                        <section className=' w-[100%] h-[100%] rounded-[15px] flex justify-between items-center p-5 relative'>
                                                            <div className='absolute right-[0px] top-[0px] text-[25px] flex' style={{ color: "black", zIndex: "9999" }} >
                                                                <FaEdit onClick={() => updatedata(items)} />
                                                                <RiDeleteBin5Fill className=' text-[25px] text-[red] ms-3' onClick={() => setmodal(true) || setmodaldata(items)} />
                                                            </div>
                                                            <section className=' w-[400px] h-[400px] rounded-[15px] overflow-hidden flex justify-center items-center'>
                                                                <img src={imgurl + items.AboutParagraphBanner} alt="" className='w-[100%] h-[100%]' />
                                                            </section>

                                                            <section className='w-[calc(100%-450px)]'>
                                                                <p className='mb-2 text-[30px]' style={{ fontWeight: items.AboutParagraphHeadingFontBold, fontSize: items.AboutParagraphHeadingFontSize + 'px', textAlign: items.AboutParagraphHeadingFontAlign, textDecoration: items.AboutParagraphHeadingTextDecoration, color: items.AboutParagraphHeadingFontColor, lineHeight: items.AboutParagraphHeadingLineHeight + 'px' }}>{items.AboutParagraphHeading}</p>
                                                                {
                                                                    aboutsubparagraph.map((item, index) => {
                                                                        return (
                                                                            items.AboutParagraphHeading === item.AboutSubParagraphHeading ?
                                                                                <div className=' relative'>
                                                                                    <div className='absolute right-[0px] top-[-30px] text-[25px] flex' style={{ color: "black", zIndex: "9999" }} >
                                                                                        <FaEdit onClick={() => updatedata(item)} />
                                                                                        <RiDeleteBin5Fill className=' text-[25px] text-[red] ms-3' onClick={() => setmodal(true) || setmodaldata(item)} />
                                                                                    </div>
                                                                                    <p className='mt-[20px]' style={{ fontWeight: item.AboutParagraphSubHeadingFontBold, fontSize: item.AboutParagraphSubHeadingFontSize + 'px', textAlign: item.AboutParagraphSubHeadingFontAlign, textDecoration: item.AboutParagraphSubHeadingTextDecoration, color: item.AboutParagraphSubHeadingFontColor, lineHeight: item.AboutParagraphSubHeadingLineHeight + 'px' }}>{item.AboutParagraphSubHeading}</p>
                                                                                </div>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }
                                                            </section>
                                                        </section> :

                                                        <section className=' w-[100%] h-[100%] rounded-[15px] flex justify-between items-center flex-row-reverse p-5 relative'>
                                                            <div className='absolute right-[0px] top-[0px] text-[25px] flex' style={{ color: "black", zIndex: "9999" }} >
                                                                <FaEdit onClick={() => updatedata(items)} />
                                                                <RiDeleteBin5Fill className=' text-[25px] text-[red] ms-3' onClick={() => setmodal(true) || setmodaldata(items)} />
                                                            </div>
                                                            <section className=' w-[400px] h-[400px] rounded-[15px] overflow-hidden flex justify-center items-center'>
                                                                <img src={imgurl + items.AboutParagraphBanner} alt="" className='w-[100%] h-[100%]' />
                                                            </section>

                                                            <section className='w-[calc(100%-450px)]'>
                                                                <p className='mb-2 text-[30px] font-[600]' style={{ fontWeight: items.AboutParagraphHeadingFontBold, fontSize: items.AboutParagraphHeadingFontSize + 'px', textAlign: items.AboutParagraphHeadingFontAlign, textDecoration: items.AboutParagraphHeadingTextDecoration, color: items.AboutParagraphHeadingFontColor, lineHeight: items.AboutParagraphHeadingLineHeight + 'px' }}>{items.AboutParagraphHeading}</p>
                                                                {
                                                                    aboutsubparagraph.map((item, index) => {
                                                                        return (
                                                                            items.AboutParagraphHeading === item.AboutSubParagraphHeading ?
                                                                                <div className=' relative'>
                                                                                    <div className='absolute right-[0px] top-[-30px] text-[25px] flex' style={{ color: "black", zIndex: "9999" }} >
                                                                                        <FaEdit onClick={() => updatedata(item)} />
                                                                                        <RiDeleteBin5Fill className=' text-[25px] text-[red] ms-3' onClick={() => setmodal(true) || setmodaldata(item)} />
                                                                                    </div>
                                                                                    <p className='mt-[20px]' style={{ fontWeight: item.AboutParagraphSubHeadingFontBold, fontSize: item.AboutParagraphSubHeadingFontSize + 'px', textAlign: item.AboutParagraphSubHeadingFontAlign, textDecoration: item.AboutParagraphSubHeadingTextDecoration, color: item.AboutParagraphSubHeadingFontColor, lineHeight: item.AboutParagraphSubHeadingLineHeight + 'px' }}>{item.AboutParagraphSubHeading}</p>
                                                                                </div>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }
                                                            </section>
                                                        </section>
                                                }
                                            </section>

                                        )
                                    }
                                })
                            }



                        </section>

                        <Footer />
                    </section >
            }
        </>
    )
}
