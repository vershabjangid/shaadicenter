import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import logo from '../../../images/Group 2.svg'
import profile from '../../../images/loginbanner1.png'
import { api, getCookie } from '../../../url/Url'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export function Search() {

    let [religions, setreligions] = useState([])
    let [mothertongue, setmothertongue] = useState([])
    let [countrydata, setcountrydata] = useState([])
    let [educationdata, seteducationdata] = useState([])
    let [occupationdata, setoccupationdata] = useState([])
    let [usersdata, setusersdata] = useState([])
    let [usersprofiledata, setusersprofiledata] = useState([])
    let [usersprofessional, setusersprofessional] = useState([])
    let [usersresidential, setusersresidential] = useState([])
    let [filterusersdata, setfilterusersdata] = useState([])

    let [imgurl, setimgurl] = useState("")
    let navigate = useNavigate();
    let viewdata = async () => {
        try {
            let [viewreligion, viewmothertongue, viewcountry, education, occupation, usersdata] = await Promise.all([
                api.get('/view-active-religions'),
                api.get('/view-active-mothertongue'),
                api.get('/view-active-country'),
                api.get('/view-active-education'),
                api.get('/view-active-occupation'),
                api.get('/search-users', {
                    headers: {
                        Authorization: getCookie('Registertoken')
                    }
                })

            ])


            return {
                viewreligions: viewreligion.data,
                viewmothertongues: viewmothertongue.data,
                viewcountries: viewcountry.data,
                educationdata: education.data,
                occupationdata: occupation.data,
                usersdatas: usersdata.data,
                imgurl: usersdata.data.imgurl
            }
        }
        catch (error) {
            console.log(error)
            navigate('/error')
        }
    }



    let finalfetch = () => {
        viewdata()
            .then((res) => {
                console.log(res.data)
                if (res.data === undefined) {
                    setreligions([])
                    setmothertongue([])
                    setcountrydata([])
                    seteducationdata([])
                    setoccupationdata([])
                    setusersdata([])
                    setusersprofessional([])
                    setusersresidential([])
                    setfilterusersdata([])
                    setimgurl([])
                }
                else {
                    setreligions(res.viewreligions)
                    setmothertongue(res.viewmothertongues)
                    setcountrydata(res.viewcountries)
                    seteducationdata(res.educationdata)
                    setoccupationdata(res.occupationdata)
                    setusersdata(res.usersdatas[0])
                    setusersprofessional(res.usersdatas[1])
                    setusersresidential(res.usersdatas[2])
                    setfilterusersdata(res.usersdatas[0])
                    setimgurl(res.usersdatas[3])
                }
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    let [caste, setcaste] = useState([])
    let viewcaste = (value) => {
        try {
            api.post('/view-active-caste', { data: value }, {
                headers: {
                    Authorization: getCookie('AdminToken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setcaste([])
                    }
                    else {
                        setcaste(res.data)
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


    let [filterstate, setfilterstates] = useState([])
    let filterstates = (value) => {
        api.post('/view-active-states', { data: value })
            .then((res) => {
                setfilterstates(res.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    let [filterdistrict, setfilterdistrict] = useState([])
    let filterdistricts = (value) => {
        console.log(value)
        api.post('/view-active-districts', { data: value })
            .then((res) => {
                setfilterdistrict(res.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }


    useEffect(() => {
        finalfetch();
        searchuser();
    }, [])



    let searchuser = (value) => {
        if (filterusersdata !== undefined && filterusersdata.length !== 0) {
            setusersdata(filterusersdata.filter((e) => e.UserName.toLowerCase().includes(value) || e.UserName.includes(value) || e.Full_Name.toLowerCase().includes(value) || e.Full_Name.includes(value) || e.Religion.toLowerCase().includes(value) || e.Religion.includes(value) || e.Caste.includes(value) || e.Caste.toLowerCase().includes(value) || e.Age.includes(value) || e.Mother_Tongue.toLowerCase().includes(value) || e.Mother_Tongue.includes(value)))
        }
        else {
            return 0;
        }
    }


    let formik = useFormik({
        initialValues: {
            AgeFrom: "" || 19,
            AgeTo: "" || 19,
            Marital_Status: "" || "Hindu",
            Religion: "",
            Caste: "",
            Mother_Tongue: "" || "Hindi"
        },
        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let insertdata = (value) => {
        try {
            api.post('/sort-search-users', value, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 404) {
                        navigate('/sign-in')
                    }
                    else {
                        setusersdata(res.data)
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
            <section className='hide_scroll w-[100%] h-[100vh] bg-[white] overflow-y-scroll'>
                <section className='w-[100%] bg-[white] p-3 text-[25px] flex items-center justify-between border-b-[1px] border-[#6e6e6e]'>
                    <section className='logo w-[80px]'>
                        <img src={logo} alt="" className='w-[100%]' />
                    </section>
                </section>


                <section className='w-[100%] h-[calc(100vh-78px)] bg-[#fff1fd] flex'>
                    <form className='hide_scroll w-[250px] h-[100%] bg-[#fee5fa] overflow-y-scroll text-black' onSubmit={formik.handleSubmit}>
                        <h1 className='text-center my-3 text-[20px] font-[600]'>Quick Search</h1>

                        <section className='w-[100%]'>
                            <div className='px-2'>
                                <section>
                                    <p className='text-[18px] font-[600]'>Age</p>
                                </section>
                            </div>

                            <section className='px-1'>
                                <section className='mb-2'>
                                    <select defaultValue={"18"} className='w-[100%] py-3 bg-[rgb(255,255,255)] rounded-[10px]' onChange={(e) => formik.setFieldValue('AgeFrom', e.target.value)}>
                                        <option>From</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                        <option value="46">46</option>
                                        <option value="47">47</option>
                                        <option value="48">48</option>
                                        <option value="49">49</option>
                                        <option value="50">50</option>
                                        <option value="51">51</option>
                                        <option value="52">52</option>
                                        <option value="53">53</option>
                                        <option value="54">54</option>
                                        <option value="55">55</option>
                                        <option value="56">56</option>
                                        <option value="57">57</option>
                                        <option value="58">58</option>
                                        <option value="59">59</option>
                                        <option value="60">60</option>
                                        <option value="70">70</option>
                                        <option value="71">71</option>
                                        <option value="72">72</option>
                                        <option value="73">73</option>
                                        <option value="74">74</option>
                                        <option value="75">75</option>
                                        <option value="76">76</option>
                                        <option value="77">77</option>
                                        <option value="78">78</option>
                                        <option value="79">79</option>
                                        <option value="80">80</option>
                                        <option value="81">81</option>
                                        <option value="82">82</option>
                                        <option value="83">83</option>
                                        <option value="84">84</option>
                                        <option value="85">85</option>
                                        <option value="86">86</option>
                                        <option value="87">87</option>
                                        <option value="88">88</option>
                                        <option value="89">89</option>
                                        <option value="90">90</option>
                                    </select>
                                    <div className='text-[red]'>{formik.errors.AgeFrom}</div>
                                </section>
                                <section className='mb-2'>
                                    <select defaultValue={"18"} className='w-[100%] py-3 px-1 bg-[white] rounded-[10px]' onChange={(e) => formik.setFieldValue('AgeTo', e.target.value)}>
                                        <option>To</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                        <option value="46">46</option>
                                        <option value="47">47</option>
                                        <option value="48">48</option>
                                        <option value="49">49</option>
                                        <option value="50">50</option>
                                        <option value="51">51</option>
                                        <option value="52">52</option>
                                        <option value="53">53</option>
                                        <option value="54">54</option>
                                        <option value="55">55</option>
                                        <option value="56">56</option>
                                        <option value="57">57</option>
                                        <option value="58">58</option>
                                        <option value="59">59</option>
                                        <option value="60">60</option>
                                        <option value="70">70</option>
                                        <option value="71">71</option>
                                        <option value="72">72</option>
                                        <option value="73">73</option>
                                        <option value="74">74</option>
                                        <option value="75">75</option>
                                        <option value="76">76</option>
                                        <option value="77">77</option>
                                        <option value="78">78</option>
                                        <option value="79">79</option>
                                        <option value="80">80</option>
                                        <option value="81">81</option>
                                        <option value="82">82</option>
                                        <option value="83">83</option>
                                        <option value="84">84</option>
                                        <option value="85">85</option>
                                        <option value="86">86</option>
                                        <option value="87">87</option>
                                        <option value="88">88</option>
                                        <option value="89">89</option>
                                        <option value="90">90</option>
                                    </select>
                                    <div className='text-[red]'>{formik.errors.AgeTo}</div>
                                </section>
                            </section>
                        </section>


                        <section className='w-[100%]  pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Marital Status</p>
                            </section>

                            <section className='px-1'>
                                <select defaultValue={"Never Married"} className='w-[100%] py-3 px-1 bg-[white] rounded-[10px]' onChange={(e) => formik.setFieldValue('Marital_Status', e.target.value)}>
                                    <option>Choose Marital Status</option>
                                    <option value="Never Married">Never Married</option>
                                    <option value="Windowed">Windowed</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Separated">Separated</option>
                                </select>
                            </section>

                        </section>


                        <section className='w-[100%]  pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Religion</p>
                            </section>

                            <section className='px-1 '>
                                <select defaultValue={"Hindu"} className='w-[100%] py-3 border-[#878787] px-1 bg-[white] rounded-[10px]'
                                    onChange={(e) => formik.setFieldValue('Religion', e.target.value) && viewcaste(e.target.value)}
                                >
                                    {
                                        religions.length === 0 ? "No data found" : religions.map((items, index) => {
                                            return (
                                                <option key={index} value={items.Religion_Name}>{items.Religion_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>


                        <section className='w-[100%]  pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Caste</p>
                            </section>

                            <section className='px-1' onChange={(e) => formik.setFieldValue('Caste', e.target.value)}>
                                <select className=' w-[100%] py-3 px-1 bg-[white] rounded-[10px]'>

                                    {
                                        caste.length === 0 ? "No data found" : caste.map((items, index) => {
                                            return (
                                                <option key={index} value={items.Caste_Name}>{items.Caste_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>


                        <section className='w-[100%]  pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Mother Tongue</p>
                            </section>

                            <section className='px-1'>
                                <select defaultValue={"Hindi"} className=' w-[100%] py-3 px-2 bg-[white] rounded-[10px]' onChange={(e) => formik.setFieldValue('Mother_Tongue', e.target.value)}>
                                    {
                                        mothertongue.length === 0 ? "No data found" : mothertongue.map((items, index) => {
                                            return (
                                                <option key={index} value={items.MotherTongue_Name}>{items.MotherTongue_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>



                        <section className='w-[100%] pt-2 flex justify-center mt-1 mb-4'>
                            <button type='submit' className='w-[96%] py-2 bg-[#ffffff] text-[#ff869a] font-[600] rounded-[10px] '>
                                Search
                            </button>
                        </section>

                    </form>
                    <section className='hide_scroll w-[calc(100%-250px)] overflow-y-scroll'>
                        <section className='w-[100%] relative'>
                            <input type="text" autoFocus="true" className='outline-0 w-[100%] py-3 ps-[10px] pe-[45px]' placeholder='Search With Name, Username, Age, Religion and More' onChange={(e) => searchuser(e.target.value)} />
                            <div className=' absolute top-[50%] translate-y-[-50%] text-[25px] right-[10px]'>
                                <FaSearch />
                            </div>
                        </section>

                        <section className='hide_scroll w-[100%] h-[calc(100%-48px)] overflow-y-scroll'>
                            {
                                usersdata === undefined || usersdata.length === 0 ?
                                    <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                                        No Data Found
                                    </div>
                                    : usersdata.map((items, index) => {
                                        return (
                                            <div key={index} >
                                                <section className='w-[98%] rounded-[20px] h-[300px] m-auto mt-2 mb-[20px] bg-[#ffffff] flex justify-between p-3'>
                                                    {
                                                        usersprofessional.map((professionalitems, index) => {

                                                            if (items.Sub_id === professionalitems.Sub_id) {
                                                                return (
                                                                    <div key={index} className='flex justify-between w-[100%]' >
                                                                        <div className='w-[280px] h-[280px] border-[1px] rounded-[10px] overflow-hidden flex justify-center items-center'>
                                                                            <img src={imgurl + items.Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                                        </div>

                                                                        <div className='w-[calc(100%-290px)] h-[280px]'>
                                                                            <div className=' flex justify-between items-center border-b-[1px] border-[black] py-2'>
                                                                                <div>
                                                                                    <p className='text-[25px] font-[600]'>{items.Full_Name}</p>
                                                                                </div>

                                                                                <div className='me-2'>
                                                                                    <Link to={`/profile/${items.UserName}`} className='bg-[#ff869a] px-4 py-3 rounded-[20px] text-white'>View Profile</Link>
                                                                                </div>
                                                                            </div>


                                                                            <div className=' py-2'>
                                                                                <p className='text-[15px] font-[600] mb-2'>Age : <span className='font-[300] text-[14px]'>{items.Age} Years</span></p>
                                                                                <p className='text-[15px] font-[600] mb-2'>Religion : <span className='font-[300] text-[14px]'>{items.Religion}</span></p>
                                                                                <p className='text-[15px] font-[600] mb-2'>Caste : <span className='font-[300] text-[14px]'>{items.Caste}</span></p>
                                                                                <p className='text-[15px] font-[600] mb-2'>Mother Tongue : <span className='font-[300] text-[14px]'>{items.Mother_Tongue}</span></p>
                                                                                <p className='text-[15px] font-[600] mb-2'>Highest Education : <span className='font-[300] text-[14px]'>{professionalitems.Highest_Education}</span></p>
                                                                                <p className='text-[15px] font-[600] mb-2'>Occupation : <span className='font-[300] text-[14px]'>{professionalitems.Occupation_Name}</span></p>
                                                                                {
                                                                                    usersresidential === undefined || usersresidential.length === 0 ?
                                                                                        <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                                                                                            No Data Found
                                                                                        </div> :
                                                                                        usersresidential.map((usersresidentialitems, index) => {
                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    {
                                                                                                        usersresidentialitems.Sub_id === items.Sub_id ? <>
                                                                                                            <p className='text-[15px] font-[600] mb-2'>Location : <span className='font-[300] text-[14px]'>{usersresidentialitems.State} / {usersresidentialitems.District}</span></p>
                                                                                                        </> :
                                                                                                            null
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            else {
                                                            }
                                                        })
                                                    }
                                                </section>
                                            </div>
                                        )

                                    })
                            }

                        </section>
                    </section>
                </section >
            </section >
        </>
    )
}