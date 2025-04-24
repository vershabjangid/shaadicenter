import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { api, getCookie } from '../../../url/Url'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { useNavigate } from 'react-router-dom'

export function DashThemes() {


    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();
    let insertdata = (value) => {
        let data = {
            WebsiteBackground: value[1],
            Text_color: value[0],
            Btn_Color1: value[2],
            Btn_Color2: value[3],
            Icons_Filter: value[4]
        }

        try {
            api.post('/website-theme', data, {
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
    return (
        <>
            <section className='dash_main w-[100%]'>
                <DashboardHeader />

                <section className='w-[100%] h-[calc(100vh-97px)] border-[1px] border-[blue] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll border-[1px] border-[red] bg-[#deeff6] p-3'>
                        <h1 className='text-[30px] font-[600]'>Themes</h1>

                        <section className='bg-[white] p-3 rounded-[10px] mt-[10px]'>
                            <section className='w-[100%] flex justify-between border-[1px] my-[20px] flex-wrap'>
                                <section className='' onClick={() => insertdata(["#FFFFFF", "#ffd9dc", "#e42141", "#ff5874", "brightness(0) saturate(100%) invert(21%) sepia(49%) saturate(5361%) hue-rotate(338deg) brightness(92%) contrast(94%)"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative' >
                                        <div className='w-[100%] h-[100%] bg-[#ffd9dc] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#ff5874] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#e42141] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFFFFF] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                                <section className='' onClick={() => insertdata(["#FFFFFF", "#ffc9d9", "#E53888", "#AC1754", "brightness(0) saturate(100%) invert(39%) sepia(45%) saturate(5983%) hue-rotate(312deg) brightness(94%) contrast(90%)"])}>
                                    <div className='w-[80px] h-[80px] bg-[grey] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#AC1754] bottom-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#E53888] top-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#ffc9d9] bottom-[-50%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFFFFF] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                                <section className='' onClick={() => insertdata(["#FFFFFF", "#D17D98", "#56021F", "#7D1C4A", "brightness(0) saturate(100%) invert(11%) sepia(24%) saturate(6890%) hue-rotate(319deg) brightness(88%) contrast(110%)"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#7D1C4A] top-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#56021F] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#D17D98]  bottom-[-50%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFFFFF] top-[-50%] left-[-50%] absolute '></div>
                                    </div>
                                </section>


                                <section className='' onClick={() => insertdata(["#FFFFFF", "#3ABEF9", "#3572EF", "#050C9C"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#050C9C] top-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#3572EF] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#3ABEF9]  bottom-[-50%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFFFFF] top-[-50%] left-[-50%] absolute '></div>
                                    </div>
                                </section>


                                <section className='' onClick={() => insertdata(["#FFFFFF", "#ffbb90", "#D91656", "#FFB200"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#640D5F] top-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#D91656] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#ffbb90]  bottom-[-50%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#ffffff] top-[-50%] left-[-50%] absolute '></div>
                                    </div>
                                </section>

                                <section className='' onClick={() => insertdata(["#FFFFFF", "#ffbb90", "#D91656", "#FFB200"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#640D5F] top-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#D91656] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#ffbb90]  bottom-[-50%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#ffffff] top-[-50%] left-[-50%] absolute '></div>
                                    </div>
                                </section>


                                <section className='' onClick={() => insertdata(["#e42141", "#ff5874", "#ffd9dc", "#000000"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#FC4100] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFC55A] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#00215E] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#2C4E80] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                                <section className='' onClick={() => insertdata(["#D70654", "#B8D576", "#FFEFC8", "#FFD95F"])}>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#D70654] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#B8D576] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFEFC8] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#FFD95F] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>





                                <section className=''>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#F7A8C4] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#F37199] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#E53888] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#AC1754] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                                <section className=''>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#F7A8C4] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#F37199] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#E53888] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#AC1754] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                                <section className=''>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#F7A8C4] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#F37199] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#E53888] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#AC1754] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                                <section className=''>
                                    <div className='w-[80px] h-[80px] border-[2px] rounded-[50%] overflow-hidden relative'>
                                        <div className='w-[100%] h-[100%] bg-[#F7A8C4] top-[-50%] absolute '></div>
                                        <div className='w-[100%] h-[100%] bg-[#F37199] bottom-[-50%] right-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#E53888] top-[0%] left-[-50%] absolute'></div>
                                        <div className='w-[100%] h-[100%] bg-[#AC1754] top-[-50%] left-[-50%] absolute'></div>
                                    </div>
                                </section>


                            </section>

                            <section className='w-[100%] flex justify-between border-[1px] my-[20px]'>

                            </section>

                        </section>
                    </section>
                </section >
            </section >
            <Toaster />
        </>
    )
}
