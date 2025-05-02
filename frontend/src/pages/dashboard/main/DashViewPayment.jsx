import React from 'react'
import { DashboardSidebar } from '../../../common/DashboardSidebar'
import { DashboardHeader } from '../../../common/DashboardHeader'
import { data, useLocation, useNavigate } from 'react-router-dom'
import { api, getCookie } from '../../../url/Url';
import toast, { Toaster } from 'react-hot-toast';
import { DateFormat } from '../../website/main/DateFormat';

export function DashViewPayment() {
    let location = useLocation();
    let data = location.state

    let notificationsuccess = (success) => toast.success(success);
    let notificationerror = (error) => toast.error(error);
    let navigate = useNavigate();
    let updatedata = (value) => {
        try {
            let userdata = {
                Validity: data.Data.PackageValidity,
                User_Id: data.Data.User_Id,
                Status: value
            }
            console.log(userdata)
            api.put('/update-payment', userdata, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message);
                        navigate('/dash-payments')
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

                <section className='w-[100%] h-[calc(100vh-97px)] flex justify-between'>
                    <DashboardSidebar />
                    <section className='w-[calc(100%-250px)] h-[100%] overflow-y-scroll bg-[#eaf5fa] p-3'>
                        <section className='w-[100%] rounded-[10px] p-4 bg-[white]'>
                            <section className='w-[80%] p-3 py-[20px] bg-[white] m-auto rounded-[20px]'>

                                <section className='w-[100%] my-[20px] flex justify-between'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <p className='font-[800] text-[25px] uppercase'>User_Id :{data.Data.User_Id}</p>
                                            <p className=' text-[16px] font-[600]'>Package Name : {data.Data.PackageName}</p>
                                            <p className=' text-[16px] mt-[10px] font-[600]'>Package Price : {data.Data.PackagePrice}</p>
                                            <p className=' text-[16px] mt-[10px] font-[600]'>PackageValidity : {data.Data.PackageValidity}</p>
                                            <p className=' text-[16px] mt-[10px] font-[600]'>TransactionID : {data.Data.TransactionID}</p>
                                            <p className=' text-[16px] mt-[10px] font-[600]'>Status : {data.Data.Status}</p>
                                            <p className=' text-[16px] mt-[10px] font-[600]'>Active At : <DateFormat value={data.Data.ActivateAt} /></p>
                                            <p className=' text-[16px] mt-[10px] font-[600]'>Expires On : <DateFormat value={data.Data.ExpiresAt} /></p>
                                            <div className=' text-[16px] mt-[50px] font-[600]'>Screenshot : <img src={data.imgurl + data.Data.PaymentScreenShot} alt="" /></div>
                                            <div className=' text-[16px] mt-[50px] font-[600]'>
                                                <button className='text-[white] bg-[green] py-3 px-5 rounded-[10px]' onClick={() => updatedata("Active")}>
                                                    Accept
                                                </button>

                                                <button className='text-[white] ms-3 bg-[red] py-3 px-5 rounded-[10px]' onClick={() => updatedata("Declined")}>
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
            <Toaster />
        </>
    )
}
