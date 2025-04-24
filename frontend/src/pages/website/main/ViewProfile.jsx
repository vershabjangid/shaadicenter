import React, { useEffect, useState } from 'react'
import { Loader } from '../../../common/Loader'
import { Header } from '../../../common/Header'
import image from '../../../images/Gemini_Generated_Image_bnoy1ebnoy1ebnoy1.png'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheck, FaEdit } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { Footer } from '../../../common/Footer'
export function ViewProfile() {
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
            api.post('/user-data', { _id: getCookie('User_Id') }, {
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



    let updatebasic = (value) => {
        navigate('/update-basic', { state: value })
    }



    let updateprofessional = (value) => {
        navigate('/update-professional', { state: value })
    }


    let updatecontact = (value) => {
        navigate('/update-contact', { state: value })
    }


    let updatefamily = (value) => {
        navigate('/update-family', { state: value })
    }


    let changeprofilepicture = (value) => {
        navigate('/update-profile-picture', { state: value })
    }

    return (
        <>
            {
                loader ? <Loader />
                    : <section className='main'>
                        <Header />

                        <section className='w-[100%] h-[85px] border-[1px] bg-[red]'></section>
                        <section className='w-[100%] py-[40px]  bg-[#ffffff]'>
                            <section className='w-[80%] p-3 py-[20px] m-auto rounded-[20px]'>
                                {/* <h1 className='text-[23px]'>View Profile</h1> */}

                                <section className='bg-[#d9d7d7a3] p-4 rounded-[10px]'>
                                    <div className='flex justify-end'>
                                        <FaEdit className='text-[20px] cursor-pointer' onClick={() => changeprofilepicture(registerdata)} />
                                    </div>
                                    <section className='w-[100%] my-[20px] flex justify-between '>
                                        <section className='w-[300px] h-[300px] m-auto border-[1px] rounded-[10px] overflow-hidden'>
                                            <img src={profiledata === null || profiledata === undefined || profiledata.Profile_Picture === undefined ? image : `${imgurl}/${profiledata.Profile_Picture}`} alt="" className='w-[100%] h-[100%]' />
                                        </section>
                                        <section className='w-[calc(100%-350px)] h-[100%]'>
                                            <div>
                                                <p className='font-[800] text-[25px] uppercase'>{profiledata === null || profiledata === undefined || profiledata.Full_Name === undefined ? "N/A" : profiledata.Full_Name}</p>
                                                <p className=' text-[16px] font-[600]'>{registerdata === null || registerdata === undefined || registerdata.UserName === undefined ? "N/A" : registerdata.UserName}</p>
                                                <p className=' text-[16px] mt-[10px]'>{profiledata === null || profiledata === undefined || profiledata.Profile_For === undefined ? "N/A" : "Created For" + " " + profiledata.Profile_For}</p>
                                                <p className=' text-[16px] mt-[5px]'>{profiledata === null || profiledata === undefined || profiledata.Gender === undefined ? "N/A" : profiledata.Gender}</p>
                                                <p className=' text-[16px] mt-[5px]'>{profiledata === null || profiledata === undefined || profiledata.Date_Of_Birth === undefined ? "N/A" : profiledata.Date_Of_Birth}</p>
                                                <p className=' text-[16px] mt-[5px]'>{profiledata === null || profiledata === undefined || profiledata.Caste === undefined ? "N/A" : profiledata.Caste}</p>
                                                <p className=' text-[16px] mt-[5px]'>{professionaldata === null || professionaldata === undefined || professionaldata.Highest_Education === undefined ? "N/A" : professionaldata.Highest_Education}</p>
                                                <p className=' text-[16px] mt-[5px]'>{residentialdata === null || residentialdata === undefined || residentialdata.Country === undefined ? "N/A" : residentialdata.Country} / {residentialdata === null || residentialdata === undefined || residentialdata.State === undefined ? "N/A" : residentialdata.State} /  {residentialdata === null || residentialdata === undefined || residentialdata.District === undefined ? "N/A" : residentialdata.District}</p>
                                                <p className=' text-[16px] mt-[5px] flex items-center' >{profiledata === null || profiledata === undefined || registerdata.Phone_No === undefined ? "N/A" : registerdata.Phone_No} /&nbsp; {profiledata === null || profiledata === undefined || registerdata.Is_verified === undefined ? "N/A" : (registerdata.Is_verified === true ? <span className='text-green-500 flex items-center'><FaCheck />&nbsp; Verified </span> : <span className='text-red-500 flex items-center'><FaXmark />&nbsp; Not Verified </span>)}</p>
                                            </div>
                                        </section>
                                    </section>

                                </section>


                                <section className='w-[100%] my-[20px]  bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <div className=' w-[100%] flex justify-end'>
                                        <Link to={`/update-myself/${profiledata === null || profiledata === undefined || profiledata.About_Myself === undefined ? null : profiledata._id}/${profiledata === null || profiledata === undefined || profiledata.About_Myself === undefined ? null : profiledata.About_Myself}`}>
                                            <FaEdit className='text-[20px] cursor-pointer' />
                                        </Link>

                                    </div>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <p className='font-[800] text-[25px]'>About Myself</p>
                                            <p className=' text-[16px]'>{profiledata === null || profiledata === undefined || profiledata.About_Myself === undefined ? "N/A" : profiledata.About_Myself}</p>
                                        </div>
                                    </section>
                                </section>

                                <section className='w-[100%] my-[20px] flex justify-between bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <div className=' w-[100%] flex justify-end'>
                                                <FaEdit className='text-[20px] cursor-pointer' onClick={() => updatebasic(profiledata)} />
                                            </div>
                                            <p className='font-[800] text-[25px]'>Basic Details</p>

                                            <div className='w-[100%] mt-[10px] flex'>

                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Created For : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Profile_For === undefined ? "N/A" : profiledata.Profile_For}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Username : <span className='font-[400] text-[grey]'>{registerdata === null || registerdata === undefined || registerdata.UserName === undefined ? "N/A" : registerdata.UserName}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Date of birth : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Date_Of_Birth === undefined ? "N/A" : profiledata.Date_Of_Birth}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Phone.No : <span className='font-[400] text-[grey]'>{registerdata === null || registerdata === undefined || registerdata.Phone_No === undefined ? "N/A" : registerdata.Phone_No}</span>
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
                                                            Email : <span className='font-[400] text-[grey]'>{registerdata === null || registerdata === undefined || registerdata.Email === undefined ? "N/A" : registerdata.Email}</span>
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


                                                        <li className='font-[600] my-2'>
                                                            Smoking Habits : <span className='font-[400] text-[grey]'>{profiledata === null || profiledata === undefined || profiledata.Smoking_Habits === undefined ? "N/A" : profiledata.Smoking_Habits}</span>
                                                        </li>


                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>



                                <section className='w-[100%] my-[20px] flex justify-between bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <div className=' w-[100%] flex justify-end'>
                                                <FaEdit className='text-[20px]' onClick={() => updateprofessional(professionaldata)} />
                                            </div>
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


                                <section className='w-[100%] my-[20px] flex justify-between bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <div className=' w-[100%] flex justify-end'>
                                                <FaEdit className='text-[20px]' onClick={() => updatecontact(residentialdata)} />
                                            </div>
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
                                                        <li className='font-[600] my-2'>
                                                            District : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.District === undefined ? "N/A" : residentialdata.District}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Address : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.Address === undefined ? "N/A" : residentialdata.Address}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className='w-[50%]'>
                                                    <ul>
                                                        <li className='font-[600] my-2'>
                                                            Citizenship : <span className='font-[400] text-[grey]'>{residentialdata === null || residentialdata === undefined || residentialdata.Citizenship === undefined ? "N/A" : residentialdata.Citizenship}</span>
                                                        </li>

                                                        <li className='font-[600] my-2'>
                                                            Email : <span className='font-[400] text-[grey]'>{registerdata === null || registerdata === undefined || registerdata.Email === undefined ? "N/A" : registerdata.Email}</span>
                                                        </li>
                                                        <li className='font-[600] my-2'>
                                                            Phone.no : <span className='font-[400] text-[grey]'>{registerdata === null || registerdata === undefined || registerdata.Phone_No === undefined ? "N/A" : registerdata.Phone_No}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                    </section>
                                </section>


                                <section className='w-[100%] my-[20px] flex justify-between bg-[#d9d7d7a3] py-4 rounded-[10px] px-5'>
                                    <section className='w-[100%] h-[100%]'>
                                        <div>
                                            <div className=' w-[100%] flex justify-end'>
                                                <FaEdit className='text-[20px]' onClick={() => updatefamily(familydata)} />
                                            </div>
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
                                                            No Of Children : <span className='font-[400] text-[grey]'>{familydata === null || familydata === undefined || familydata.No_Of_Children === undefined ? "N/A" : familydata.No_Of_Children}</span>
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
