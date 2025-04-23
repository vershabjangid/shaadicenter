import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Loader } from '../../../common/Loader'
import { Footer } from '../../../common/Footer'
import banner from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import { api } from '../../../url/Url'
export function AboutUs() {
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
    // console.log(aboutsubparagraph)
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
    return (
        <>
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
                                                <section className='w-[95%] m-auto px-5 py-3'>
                                                    <section className=' w-[100%] h-[100%] rounded-[15px] flex items-center'>
                                                        <section className='w-[100%] mx-3'>
                                                            <p className='mb-2 text-[30px] font-[600]'>{items.AboutParagraphHeading}</p>
                                                            {
                                                                aboutsubparagraph.map((item, index) => {
                                                                    return (
                                                                        items.AboutParagraphHeading === item.AboutSubParagraphHeading ?
                                                                            <p className='mt-[20px]'>{item.AboutParagraphSubHeading}</p>
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
                                            <section className='w-[95%] m-auto  py-3'>
                                                {
                                                    index % 2 === 0 ?
                                                        <section className=' w-[100%] h-[100%] rounded-[15px] flex justify-between items-center p-5'>
                                                            <section className=' w-[400px] h-[400px] rounded-[15px] overflow-hidden flex justify-center items-center'>
                                                                <img src={imgurl + items.AboutParagraphBanner} alt="" className='w-[100%] h-[100%]' />
                                                            </section>

                                                            <section className='w-[calc(100%-450px)]'>
                                                                <p className='mb-2 text-[30px] font-[600]'>{items.AboutParagraphHeading}</p>
                                                                {
                                                                    aboutsubparagraph.map((item, index) => {
                                                                        return (
                                                                            items.AboutParagraphHeading === item.AboutSubParagraphHeading ?
                                                                                <p className='mt-[20px]'>{item.AboutParagraphSubHeading}</p>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }
                                                            </section>
                                                        </section> :

                                                        <section className=' w-[100%] h-[100%] rounded-[15px] flex justify-between items-center flex-row-reverse p-5'>
                                                            <section className=' w-[400px] h-[400px] rounded-[15px] overflow-hidden flex justify-center items-center'>
                                                                <img src={imgurl + items.AboutParagraphBanner} alt="" className='w-[100%] h-[100%]' />
                                                            </section>

                                                            <section className='w-[calc(100%-450px)]'>
                                                                <p className='mb-2 text-[30px] font-[600]'>{items.AboutParagraphHeading}</p>
                                                                {
                                                                    aboutsubparagraph.map((item, index) => {
                                                                        return (
                                                                            items.AboutParagraphHeading === item.AboutSubParagraphHeading ?
                                                                                <p className='mt-[20px]'>{item.AboutParagraphSubHeading}</p>
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
