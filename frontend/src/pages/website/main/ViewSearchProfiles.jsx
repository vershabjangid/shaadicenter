import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Footer } from '../../../common/Footer';
import { Header } from '../../../common/Header';
import { Loader } from '../../../common/Loader';
import { api, getCookie } from '../../../url/Url';
import image from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import { FaCheck, FaEnvelope, FaGraduationCap, FaHeart, FaOm } from 'react-icons/fa';
import { FaCakeCandles, FaLocationPin, FaXmark } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi';

export function ViewSearchProfiles() {
    let {Sub_id} = useParams();
    let [loader, setloader] = useState(false)
    let navigate = useNavigate();

    let [profiledata, setprofiledata] = useState(null)
    let [registerdata, setregisterdata] = useState(null)
    let [professionaldata, setprofessionaldata] = useState(null)
    let [residentialdata, setresidentialdatadata] = useState(null)
    let [familydata, setfamilydata] = useState(null)
    let [imgurl, setimgurl] = useState(null)
    let userdata = () => {
        setloader(true)
        try {
            api.post('/search-user-profile', { UserName: Sub_id }, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    setprofiledata(res.data.profiledata)
                    setregisterdata(res.data.viewregister)
                    setprofessionaldata(res.data.professionaldata)
                    setresidentialdatadata(res.data.residentialdata)
                    setfamilydata(res.data.familydata)
                    setimgurl(res.data.imgurl)
                    setloader(false)

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

    useEffect(() => {
        userdata()
    }, [])


    return (
        <>
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#fff1fd]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>
                                <section className='profileshadow bg-[#ffffff] p-4 rounded-[10px] mb-4'>
                                    <h1 className='text-[23px] font-[600]'>View Profile</h1>
                                </section>


                                <section className='profileshadow bg-[#ffffff] p-4 rounded-[10px]'>

                                    <section className='w-[100%] my-[20px] flex justify-between '>
                                        <section className='w-[300px] h-[300px] m-auto border-[1px] rounded-[10px] overflow-hidden'>
                                            <img src={profiledata === null || profiledata === undefined || profiledata.Profile_Picture === undefined ? image : `${imgurl}/${profiledata.Profile_Picture}`} alt="" className='w-[100%] h-[100%]' />
                                        </section>
                                        <section className='w-[calc(100%-350px)] h-[100%]'>
                                            <div>
                                                <p className='font-[800] text-[25px] uppercase'>{profiledata === null || profiledata === undefined || profiledata.Full_Name === undefined ? "N/A" : profiledata.Full_Name}</p>
                                                <p className=' text-[16px] font-[600]'>{profiledata === null || profiledata === undefined || profiledata.UserName === undefined ? "N/A" : profiledata.UserName}</p>
                                                <p className='text-[15px] font-[600] my-2 flex items-center'><div className='me-1 p-1 rounded-[5px] text-white bg-[pink]'><FaCakeCandles /></div> <span className='font-[500] text-[14px]'>{profiledata === null || profiledata === undefined || profiledata.Date_Of_Birth === undefined ? "N/A" : profiledata.Date_Of_Birth}</span></p>
                                                <p className='text-[15px] font-[600] my-2 flex items-center'><div className='me-1 p-1 rounded-[5px] text-white bg-[pink]'><FaOm /></div> <span className='font-[500] text-[14px]'>{profiledata === null || profiledata === undefined || profiledata.Religion === undefined ? "N/A" : profiledata.Religion}</span></p>
                                                <p className='text-[15px] font-[600] my-2 flex items-center'><div className='me-1 p-1 rounded-[5px] text-white bg-[pink]'><HiUserGroup /></div> <span className='font-[500] text-[14px]'>{profiledata === null || profiledata === undefined || profiledata.Caste === undefined ? "N/A" : profiledata.Caste}</span></p>
                                                <p className='text-[15px] font-[600] my-2 flex items-center'><div className='me-1 p-1 rounded-[5px] text-white bg-[pink]'><FaGraduationCap /></div> <span className='font-[500] text-[14px]'>{professionaldata === null || professionaldata === undefined || professionaldata.Highest_Education === undefined ? "N/A" : professionaldata.Highest_Education}</span></p>
                                                <p className='text-[15px] font-[600] my-2 flex items-center'><div className='me-1 p-1 rounded-[5px] text-white bg-[pink]'><FaLocationPin /></div> <span className='font-[500] text-[14px]'>{residentialdata === null || residentialdata === undefined || residentialdata.Country === undefined ? "N/A" : residentialdata.Country} / {residentialdata === null || residentialdata === undefined || residentialdata.State === undefined ? "N/A" : residentialdata.State} /  {residentialdata === null || residentialdata === undefined || residentialdata.District === undefined ? "N/A" : residentialdata.District}</span></p>
                                            </div>
                                            <div className='mt-[30px] flex'>
                                                <Link to={`/view-messages/${Sub_id}`} className='profileshadow flex items-center text-[#ff869a] py-3 px-4 rounded-[10px]'><FaEnvelope className='me-2' /> Send Message</Link>
                                                <Link to={`/send-intrest/${Sub_id}`} className='profileshadow flex items-center text-[#ff869a] py-3 px-4 rounded-[10px] ms-5'><FaHeart className='me-2' />Send Interests</Link>
                                            </div>
                                        </section>
                                    </section>

                                </section>


                                <section className='profileshadow w-[100%] my-[20px]  bg-[#ffffff] py-4 rounded-[10px] px-5'>

                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <p className='font-[800] text-[25px]'>About Myself</p>
                                            <p className=' text-[16px]'>{profiledata === null || profiledata === undefined || profiledata.About_Myself === undefined ? "N/A" : profiledata.About_Myself}</p>
                                        </div>
                                    </section>
                                </section>

                                <section className='profileshadow w-[100%] my-[20px] flex justify-between bg-[#ffffff] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>

                                            <p className='font-[800] text-[25px]'>Basic Details</p>

                                            <div className='w-[100%] mt-[10px] flex'>

                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Username : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.UserName === undefined ? "N/A" : profiledata.UserName}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Date of birth : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Date_Of_Birth === undefined ? "N/A" : profiledata.Date_Of_Birth}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Caste : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Caste === undefined ? "N/A" : profiledata.Caste}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Height : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Height === undefined ? "N/A" : profiledata.Height}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Body Type : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Body_Type === undefined ? "N/A" : profiledata.Body_Type}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Drinking Habits : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Drinking_Habits === undefined ? "N/A" : profiledata.Drinking_Habits}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Smoking Habits : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Smoking_Habits === undefined ? "N/A" : profiledata.Smoking_Habits}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Name : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Full_Name === undefined ? "N/A" : profiledata.Full_Name}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Marital Status : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Marital_Status === undefined ? "N/A" : profiledata.Marital_Status}</span>
                                                        </li>




                                                        <li className='font-[600] my-2'>
                                                            MotherTongue : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Mother_Tongue === undefined ? "N/A" : profiledata.Mother_Tongue}</span>
                                                        </li>


                                                        <li className='font-[600] my-2'>
                                                            Religion : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Religion === undefined ? "N/A" : profiledata.Religion}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Weight : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Weight === undefined ? "N/A" : profiledata.Weight}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Eating Habits : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Eating_Habits === undefined ? "N/A" : profiledata.Eating_Habits}</span>
                                                        </li>




                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>



                                <section className='profileshadow w-[100%] my-[20px] flex justify-between bg-[#ffffff] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>

                                            <p className='font-[800] text-[25px]'>Professional Details</p>

                                            <div className='w-[100%] mt-[10px] flex'>
                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Education : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Highest_Education === undefined ? "N/A" : professionaldata.Highest_Education}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>

                                                            Education Details : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Education_Details === undefined ? "N/A" : professionaldata.Education_Details}</span>

                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Institution Name : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Institution_Name === undefined ? "N/A" : professionaldata.Institution_Name}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Occupation : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Occupation_Name === undefined ? "N/A" : professionaldata.Occupation_Name}</span>
                                                        </li>



                                                    </ul>
                                                </div>

                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Occupation Details : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Occupation_Details === undefined ? "N/A" : professionaldata.Occupation_Details}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Organization Name : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Organization_Name === undefined ? "N/A" : professionaldata.Organization_Name}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Salary : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Salary === undefined ? "N/A" : professionaldata.Salary}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Sector : <span className='font-[400] text-[grey]'>{professionaldata === null || professionaldata === undefined || professionaldata.Sector === undefined ? "N/A" : professionaldata.Sector}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>


                                <section className='profileshadow w-[100%] my-[20px] flex justify-between bg-[#ffffff] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>

                                            <p className='font-[800] text-[25px]'>Contact Details</p>

                                            <div className='w-[100%] mt-[10px] flex'>
                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Country : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.Country === undefined ? "N/A" : residentialdata.Country}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>

                                                            State : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.State === undefined ? "N/A" : residentialdata.State}</span>

                                                        </li>


                                                    </ul>
                                                </div>

                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            District : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.District === undefined ? "N/A" : residentialdata.District}</span>
                                                        </li>


                                                        <li className='font-[600] my-2'>
                                                            Citizenship : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.Citizenship === undefined ? "N/A" : residentialdata.Citizenship}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                    </section>
                                </section>


                                <section className='profileshadow w-[100%] my-[20px] flex justify-between bg-[#ffffff] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>

                                            <p className='font-[800] text-[25px]'>Family Details</p>

                                            <div className='w-[100%] mt-[10px] flex'>
                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Family Values : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Family_Values === undefined ? "N/A" : familydata.Family_Values}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>

                                                            Family Type : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Family_Type === undefined ? "N/A" : familydata.Family_Type}</span>

                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Father Name : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Father_Name === undefined ? "N/A" : familydata.Father_Name}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Father Designation : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Father_Designation === undefined ? "N/A" : familydata.Father_Designation}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            No of Brothers: <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.No_Of_Brothers === undefined ? "N/A" : familydata.No_Of_Brothers}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className='w-[50%]'>
                                                    <ul>

                                                        <li className='font-[600] my-2'>
                                                            Family Status : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Family_Status === undefined ? "N/A" : familydata.Family_Status}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            No of Children : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.No_Of_Children === undefined ? "N/A" : familydata.No_Of_Children}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Mother Name : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Mother_Name === undefined ? "N/A" : familydata.Mother_Name}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Mother Designation : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.Mother_Designation === undefined ? "N/A" : familydata.Mother_Designation}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            No of Sisters : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.No_Of_Sisters === undefined ? "N/A" : familydata.No_Of_Sisters}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                    </section>
                                </section>
                            </section>



                        </section>

                        <Footer />
                    </section >
            }
        </>
    )
}
