import React, { useEffect, useState } from 'react'
import { Footer } from '../../../common/Footer'
import { Header } from '../../../common/Header'
import { Loader } from '../../../common/Loader'
import banner from '../../../images/loginbanner1.png'
import Slider from "react-slick";
import { BsChatHeartFill, BsQuestionCircle } from 'react-icons/bs'
import { FaUserPlus } from 'react-icons/fa'
import { api } from '../../../url/Url'
export function Home() {
    let [loader, setloader] = useState(false)


    let fetch = async () => {
        try {
            let [homebanner, homecounter, homewhychoose, homefeatured, homesuccess] = await Promise.all([
                api.get('/view-home-banner'),
                api.get('/view-homecounter'),
                api.get('/view-home-why-choose'),
                api.get('/view-home-featured'),
                api.get('/view-home-success')
            ])
            return {
                homebanners: homebanner.data.viewdata,
                homecounters: homecounter.data,
                homewhychooses: homewhychoose.data,
                homefeatures: homefeatured.data,
                homesuccessstories: homesuccess.data,
                imgurl: homebanner.data.url
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let [homebannerdata, sethomebannerdata] = useState([])
    let [homebannercounter, sethomebannercounter] = useState([])
    let [homewhychoosedata, sethomewhychoosedata] = useState([])
    let [homefeatureddata, sethomefeatureddata] = useState([])
    let [homesuccessdata, sethomesuccessdata] = useState([])
    let [imgurl, setimgurl] = useState([])
    let finalfetch = () => {
        fetch()
            .then((res) => {
                sethomebannerdata(res.homebanners)
                sethomebannercounter(res.homecounters)
                sethomewhychoosedata(res.homewhychooses)
                sethomefeatureddata(res.homefeatures)
                sethomesuccessdata(res.homesuccessstories)
                setimgurl(res.imgurl)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        finalfetch();
    }, [])

    console.log(homebannercounter)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        centerMode: true,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 786,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 627,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            }
        ]
    };



    return (
        <>
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] bg-[red]'></section>
                        {
                            homebannerdata.length === 0 ?
                                <div className='w-[100%] h-[100vh] bg-[#9d9d9d] flex justify-center items-center'>No Data Found</div> :
                                homebannerdata.map((items, index) => {
                                    return (
                                        <section key={index} className='home_banner w-[100%] h-[100vh] px-2 flex justify-between bg-[#460b5e]' style={(items.Banner_direction === 'right') ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }}>
                                            <section className='home_banner_content  w-[50%] flex justify-center flex-col'>
                                                <h1 style={{ fontWeight: items.Heading_Font_Bold, fontSize: items.Heading_Font_Size + 'px', lineHeight: items.Heading_Line_Height + 'px', textAlign: items.Heading_Text_Align, color: items.Heading_Text_Color, textDecoration: items.Heading_Text_Decoration }}>{items.Heading} </h1>
                                                <p className='text-[white] text-[18px] mt-3' style={{ fontWeight: items.Sub_Heading_Font_Bold, fontSize: items.Sub_Heading_Font_Size + 'px', lineHeight: items.Sub_Heading_Line_Height + 'px', textAlign: items.Sub_Heading_Text_Align, color: items.Sub_Heading_Text_Color, textDecoration: items.Sub_Heading_Text_Decoration }}>{items.Sub_Heading}</p>
                                                <div className='text-white mt-3'>
                                                    <button className='px-3 py-2 bg-[#ff40ff] rounded-[100px]'>Start Your Journey</button>
                                                    <button className='px-3 py-2 border-[1px] border-[#ff40ff] rounded-[100px] ms-3 text-[#ff40ff]'>Learn More</button>
                                                </div>
                                            </section>
                                            <section className='w-[50%] overflow-hidden flex justify-center items-center'>
                                                <img src={imgurl + items.Banner_Image} alt="" className='w-[100%] rounded-[10px]' />
                                            </section>
                                        </section>
                                    )
                                })
                        }




                        <section className='w-[100%] px-2 py-3 bg-[#f3d6ff] z-0'>

                            <section className='w-[100%] border-[1px] flex justify-center flex-col z-[0]'>
                                <div className='text-white mt-3'>
                                    {
                                        homebannercounter.length === 0 ?
                                            <div className='w-[100%] h-[100vh] bg-[#9d9d9d] flex justify-center items-center'>No Data Found</div>
                                            :
                                            <Slider {...settings} className='z-0'>
                                                {
                                                    homebannercounter.map((items, index) => {
                                                        return (
                                                            <div className='px-3'>
                                                                <div className='bg-[#ffffff] rounded-[20px] py-3 mb-3'>
                                                                    <div className='w-[100%]'>
                                                                        <div className='mt-[10px] text-black px-2  text-center'>
                                                                            <p className='font-[800] text-[35px] text-[#460b5e]'>{items.Counter_Value}<sup>+</sup></p>
                                                                            <p className='text-[grey] '>{items.Counter_Title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                    }
                                </div>
                            </section>
                        </section>





                        <section className='main_banner_2 py-[10px] text-center bg-[#eab6ff]'>
                            {
                                homewhychoosedata.length === 0 ?
                                    <div className='w-[100%] h-[100vh] bg-[#9d9d9d] flex justify-center items-center'>No Data Found</div>
                                    :

                                    <>
                                        <h2 className='text-[30px] font-[700] mb-[20px]'>Why Choose Us</h2>
                                        <section className='flex justify-evenly  flex-wrap text-start' style={{ width: "100%" }}>
                                            {homewhychoosedata.map((items, index) => {
                                                return (
                                                    <section className='w-[330px] p-[10px]  m-[10px] relative' style={{ backgroundColor: "#FFFF", borderRadius: "7px", boxShadow: "5px 5px 5px 0px #00000057" }}>
                                                        <div className='w-[100%] overflow-hidden rounded-t-[10px]'>
                                                            <div className='w-[50px] h-[50px] rounded-[100px] flex justify-center items-center text-[20px] overflow-hidden bg-[#be4fea] text-[#460b5e]'>
                                                                <img src={`${imgurl}` + `${items.Why_Choose_Card_Icon}`} className='w-[100%] flex justify-center items-center' />
                                                            </div>
                                                        </div>
                                                        <div className='w-[100%] rounded-t-[10px]'>
                                                            <p className='mt-[5px]' style={{ fontSize: items.Why_Choose_Card_Section_Head_Font_Size + 'px', textAlign: items.Why_Choose_Card_Section_Head_Text_Align, fontWeight: items.Why_Choose_Card_Section_Head_Text_Bold, textDecoration: items.Why_Choose_Card_Section_Head_Text_Decoration, lineHeight: items.Why_Choose_Card_Section_Head_Text_Line + 'px', color: items.Why_Choose_Card_Section_Home_Heading_Color }}>{items.Why_Choose_Card_Section_Home_Heading}</p>
                                                            <p className='' style={{ fontSize: items.Why_Choose_Sub_Head_Font_Size + 'px', textAlign: items.Why_Choose_Sub_Head_Text_Align, fontWeight: items.Why_Choose_Sub_Head_Text_Bold, textDecoration: items.Why_Choose_Sub_Head_Text_Decoration, lineHeight: items.Why_Choose_Sub_Head_Text_Line + 'px', color: items.Why_Choose_Sub_Home_Heading_Color }}>{items.Why_Choose_Card_Section_Sub_Home_Heading}</p>
                                                        </div>
                                                    </section>
                                                )
                                            })
                                            }
                                        </section>
                                    </>
                            }
                        </section>





                        <section className='w-[100%] px-2 py-3 bg-[#f3d6ff] z-0'>
                            {
                                homefeatureddata.length === 0 ?
                                    <div className='w-[100%] h-[100vh] bg-[#9d9d9d] flex justify-center items-center'>No Data Found</div>
                                    :
                                    <>
                                        <section>
                                            <p className='text-[35px] font-[700] text-center'>Featured Profile</p>
                                        </section>
                                        <section className='w-[100%] border-[1px] flex justify-center flex-col z-[0]'>
                                            <div className='text-white mt-3'>
                                                <Slider {...settings} className='z-0'>
                                                    {
                                                        homefeatureddata.map((items, index) => {
                                                            return (
                                                                <div className='px-1 z-0'>
                                                                    <div className='bg-[#ffffff] rounded-[20px]'>
                                                                        <div className='w-[100%] pb-2 overflow-hidden'>
                                                                            <div className='rounded-t-[20px] h-[370px] flex justify-center items-center overflow-hidden'>
                                                                                <img src={imgurl + items.Featured_Profile_Card_Image} alt="" className='w-[100%] h-[100%]' />
                                                                            </div>
                                                                            <div className='mt-[10px] text-black px-2'>
                                                                                <p className='' style={{ fontWeight: items.Featured_Profile_Card_Section_Name_Text_Bold, fontSize: items.Featured_Profile_Card_Section_Name_Font_Size + 'px', textAlign: items.Featured_Profile_Card_Section_Name_Text_Align, textDecoration: items.Featured_Profile_Card_Section_Name_Text_Decoration, color: items.Featured_Profile_Card_Section_Home_Name_Color, lineHeight: items.Featured_Profile_Card_Section_Name_Text_Line + 'px' }}>{items.Featured_Profile_Card_Section_Name_Heading}</p>
                                                                                <p className='' style={{ fontWeight: items.Featured_Profile_Age_Text_Bold, fontSize: items.Featured_Profile_Age_Font_Size + 'px', textAlign: items.Featured_Profile_Age_Text_Align, textDecoration: items.Featured_Profile_Age_Text_Decoration, color: items.Featured_Profile_Age_Color, lineHeight: items.Featured_Profile_Age_Text_Line + 'px' }}>{items.Featured_Profile_Card_Section_Age_Heading} Years</p>
                                                                                <p className='' style={{ fontWeight: items.Featured_Profile_Location_Text_Bold, fontSize: items.Featured_Profile_Location_Font_Size + 'px', textAlign: items.Featured_Profile_Location_Text_Align, textDecoration: items.Featured_Profile_Location_Text_Decoration, color: items.Featured_Profile_Location_Color, lineHeight: items.Featured_Profile_Location_Text_Line + 'px' }}>{items.Featured_Profile_Card_Section_Location_Heading}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Slider>
                                            </div>
                                        </section>
                                    </>
                            }
                        </section>


                        <section className='main_banner_2 p-[30px] text-center bg-[#460b5e]'>
                            <h2 className='text-[30px] font-[700] mb-[20px] text-[white]'>How It Works</h2>
                            <section className='flex justify-evenly  flex-wrap w-[100%] bg-[#460b5e]'>
                                <section className='w-[330px]  m-[10px]'>
                                    <div className='w-[100%] overflow-hidden rounded-t-[10px] flex justify-center'>
                                        <div className='w-[70px] h-[70px] rounded-[100px] flex justify-center items-center text-[30px] bg-[white] text-[#460b5e]'>
                                            <FaUserPlus />
                                        </div>
                                    </div>
                                    <div className='text-center p-3 rounded-b-[10px] bg-[#460b5e]'>
                                        <p className='font-[700] text-[18px] text-[white]'>Create Profile</p>
                                        <p className='font-[400] text-[18px] text-[white]'>Sign up and create your detailed profile</p>
                                    </div>
                                </section>


                                <section className='w-[330px]  m-[10px]'>
                                    <div className='w-[100%] overflow-hidden rounded-t-[10px] flex justify-center'>
                                        <div className='w-[70px] h-[70px] rounded-[100px] flex justify-center items-center text-[30px] bg-[white] text-[#460b5e] '>
                                            <BsQuestionCircle />
                                        </div>
                                    </div>
                                    <div className='text-center p-3 rounded-b-[10px] ' >
                                        <p className='font-[700] text-[18px] text-[white]'>Find Matches</p>
                                        <p className='font-[400] text-[18px] text-[white]'>Browse profiles and find your perfect match</p>
                                    </div>
                                </section>


                                <section className='w-[330px]  m-[10px]'>
                                    <div className='w-[100%] overflow-hidden rounded-t-[10px] flex justify-center'>
                                        <div className='w-[70px] h-[70px] rounded-[100px] flex justify-center items-center text-[30px] bg-[white] text-[#460b5e]'>
                                            <BsChatHeartFill />
                                        </div>
                                    </div>
                                    <div className='text-center p-3 rounded-b-[10px]' >
                                        <p className='font-[700] text-[18px] text-[white]'>Connect</p>
                                        <p className='font-[400] text-[18px] text-[white]'>Start conversation and meet in person</p>
                                    </div>
                                </section>
                            </section>
                        </section>



                        <section className='w-[100%] px-2 py-5 bg-[#f3d6ff] z-0'>
                            {
                                homesuccessdata.length === 0 ?
                                    <div className='w-[100%] h-[100vh] bg-[#9d9d9d] flex justify-center items-center'>No Data Found</div>
                                    :

                                    <>  <section>
                                        <p className='text-[35px] font-[700] text-center'>Success Stories</p>
                                    </section>
                                        <section className='w-[100%] border-[1px] flex justify-center flex-col z-[0]'>
                                            <div className='text-white mt-3'>
                                                <Slider {...settings} className='z-0'>
                                                    {
                                                        homesuccessdata.map((items, index) => {
                                                            console.log(items)
                                                            return (
                                                                <div className=' px-1 z-0'>
                                                                    <div className='bg-[#ffffff] rounded-[20px]'>
                                                                        <div className='w-[100%] pb-2 '>
                                                                            <div className='rounded-t-[20px] h-[200px] overflow-hidden bg-[white] flex items-center'>
                                                                                <img src={imgurl + items.Success_Stories_Card_Image} alt="" className='w-[100%]' />
                                                                            </div>
                                                                            <div className=' text-black p-2 rounded-b-[20px] bg-[white]'>
                                                                                <p className='font-[700]' style={{ fontWeight: items.Success_Stories_Card_Section_Name_Text_Bold, fontSize: items.Success_Stories_Card_Section_Name_Font_Size + 'px', textAlign: items.Success_Stories_Card_Section_Name_Text_Align, textDecoration: items.Success_Stories_Card_Section_Name_Text_Decoration, color: items.Success_Stories_Card_Section_Home_Name_Color, lineHeight: items.Success_Stories_Card_Section_Name_Text_Line + 'px' }}>{items.Success_Stories_Card_Section_Name_Heading}</p>
                                                                                <p className='text-[grey]' style={{ fontWeight: items.Success_Stories_Marriage_Date_Text_Bold, fontSize: items.Success_Stories_Marriage_Date_Font_Size + 'px', textAlign: items.Success_Stories_Marriage_Date_Text_Align, textDecoration: items.Success_Stories_Marriage_Date_Text_Decoration, color: items.Success_Stories_Marriage_Date_Color, lineHeight: items.Success_Stories_Marriage_Date_Text_Line + 'px' }}>{items.Success_Stories_Card_Section_Marriage_Date_Heading}</p>
                                                                                <p className='text-[grey]' style={{ fontWeight: items.Success_Stories_Description_Text_Bold, fontSize: items.Success_Stories_Description_Font_Size + 'px', textAlign: items.Success_Stories_Description_Text_Align, textDecoration: items.Success_Stories_Description_Text_Decoration, color: items.Success_Stories_Description_Color, lineHeight: items.Success_Stories_Description_Text_Line + 'px' }}>{items.Success_Stories_Card_Section_Description_Heading.slice(0, 200)}
                                                                                    <span className='underline text-sky-400 ms-2'>
                                                                                        Readmore
                                                                                    </span>
                                                                                </p>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </Slider>
                                            </div>
                                        </section>
                                    </>
                            }
                        </section>
                        <Footer />
                    </section >
            }

        </>
    )
}
