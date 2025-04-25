import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import logo from '../../../images/Group 2.svg'
import profile from '../../../images/loginbanner1.png'
import { api, getCookie } from '../../../url/Url'
import { useNavigate } from 'react-router-dom'
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
    // let [filterusersprofiledata, setfilterusersprofiledata] = useState([])

    let [imgurl, setimgurl] = useState("")
    console.log(usersdata)
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
                console.log(res.usersdatas)
                setreligions(res.viewreligions)
                setmothertongue(res.viewmothertongues)
                setcountrydata(res.viewcountries)
                seteducationdata(res.educationdata)
                setoccupationdata(res.occupationdata)
                setusersdata(res.usersdatas.viewregister)
                setusersprofiledata(res.usersdatas.profiledata)
                setusersprofessional(res.usersdatas.professionaldata)
                setusersresidential(res.usersdatas.residentialdata)
                setfilterusersdata(res.usersdatas.viewregister)
                setimgurl(res.imgurl)
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
                setfilterstates(res.data.viewregister)
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
        filterusersdata.map((items, index) => {
            if (items.UserName === value) {
                setusersdata([items])
                return null;
            }

            else {
                usersprofiledata.map((sitems, index) => {
                    if (sitems.Full_Name === value) {
                        setusersdata([{ _id: sitems.Sub_id }])
                        return null;
                    }
                    else {
                        if (value === "" || value === null) {
                            finalfetch()
                        }
                        else{
                            return
                            // setusersdata([])
                        }
                    }
                })
            }
        })
    }



    console.log(usersdata)
    return (
        <>
            <section className='hide_scroll w-[100%] h-[100vh] bg-[white] overflow-y-scroll'>
                <section className='w-[100%] bg-[white] p-3 text-[25px] flex items-center justify-between border-b-[1px] border-[black]'>
                    <section className='logo w-[80px]'>
                        <img src={logo} alt="" className='w-[100%]' />
                    </section>
                </section>


                <section className='w-[100%] h-[calc(100vh-78px)] bg-[#bbbbbb] flex'>
                    <section className='hide_scroll w-[250px] h-[100%] bg-[rgb(67,26,108)] border-e-[1px] border-[black] overflow-y-scroll text-white'>
                        <h1 className='text-center my-2 text-[20px] font-[600]'>Search Profiles By</h1>

                        <section className='w-[100%]'>
                            <div className='px-2'>
                                <section>
                                    <p className='text-[18px] font-[600]'>Age</p>
                                </section>
                            </div>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 bg-[rgb(67,26,108)]'>
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

                                <select className='w-[100%] py-3  border-y-[1px] border-[#878787] px-1 bg-[rgb(67,26,108)]'>
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
                            </section>
                        </section>


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Marital Status</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-1 bg-[rgb(67,26,108)]'>
                                    <option>Choose Marital Status</option>
                                    <option value="Never Married">Never Married</option>
                                    <option value="Windowed">Windowed</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Separated">Separated</option>
                                </select>
                            </section>

                        </section>


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Religion</p>
                            </section>

                            <section className='px-1 '>
                                <select className='w-[100%] py-3 border-[#878787] px-1 bg-[rgb(67,26,108)]'
                                    onChange={(e) => viewcaste(e.target.value)}
                                >
                                    <option>Choose Religion</option>
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


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Caste</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-1 bg-[rgb(67,26,108)]'>
                                    <option>Choose Caste</option>
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


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Mother Tongue</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-2 bg-[rgb(67,26,108)]'>
                                    <option>Choose Mother Tongue</option>
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


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Country</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-2 bg-[rgb(67,26,108)]'
                                    onChange={(e) => filterstates(e.target.value)}
                                >
                                    <option>Choose Country</option>
                                    {
                                        countrydata.length === 0 ? "No data found" : countrydata.map((items, index) => {
                                            return (
                                                <option key={index} value={items.Country_Name}>{items.Country_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>



                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>State</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-2 bg-[rgb(67,26,108)]'
                                    onChange={(e) => filterdistricts(e.target.value)}
                                >
                                    <option>Choose State</option>
                                    {
                                        filterstate.length === 0 ? "No data found" : filterstate.map((items, index) => {
                                            return (
                                                <option key={index} value={items.State_Name}>{items.State_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>District</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-2 bg-[rgb(67,26,108)]'>
                                    <option>Choose District</option>
                                    {
                                        filterdistrict.length === 0 ? "No data found" : filterdistrict.map((items, index) => {
                                            return (
                                                <option key={index} value={items.District_Name}>{items.District_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>



                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Education</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-2 bg-[rgb(67,26,108)]'>
                                    <option>Choose Education</option>
                                    {
                                        educationdata.length === 0 ? "No data found" : educationdata.map((items, index) => {
                                            return (
                                                <option key={index} value={items.Education_Name}>{items.Education_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>


                        <section className='w-[100%] border-b-[1px] border-[#878787] pt-2'>
                            <section className='px-2'>
                                <p className='text-[18px] font-[600]'>Occupation</p>
                            </section>

                            <section className='px-1'>
                                <select className='w-[100%] py-3 px-2 bg-[rgb(67,26,108)]'>
                                    <option>Choose Occupation</option>
                                    {
                                        occupationdata.length === 0 ? "No data found" : occupationdata.map((items, index) => {
                                            return (
                                                <option key={index} value={items.Occupation_Name}>{items.Occupation_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>

                        </section>



                        <section className='w-[100%] pt-2 flex justify-center mt-1 mb-4'>
                            <button className='w-[90%] py-2 bg-[#ffffff] text-[rgb(67,26,108)] font-[600] rounded-[5px] '>
                                Search
                            </button>
                        </section>

                    </section>
                    <section className='hide_scroll w-[calc(100%-250px)] overflow-y-scroll'>
                        <section className='w-[100%] relative'>
                            <input type="text" className=' w-[100%] py-3 ps-[10px] pe-[45px]' placeholder='Search With Name and Username' onChange={(e) => searchuser(e.target.value)} />
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
                                            <>

                                                <section className='w-[98%] rounded-[20px] h-[300px] m-auto mt-2 mb-[20px] bg-[#ffffff] flex justify-between p-3'>
                                                    {
                                                        usersprofiledata === undefined || usersprofiledata.length === 0 ?
                                                            <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                                                                No Data Found
                                                            </div> :
                                                            usersprofiledata.map((profileitems, index) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            items._id === profileitems.Sub_id ?
                                                                                <>
                                                                                    <div className='w-[280px] h-[280px] border-[1px] rounded-[10px] overflow-hidden flex justify-center items-center'>
                                                                                        <img src={imgurl + profileitems.Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                                                    </div>

                                                                                    <div className='w-[calc(100%-290px)] h-[280px]'>
                                                                                        <div className=' flex justify-between items-center border-b-[1px] border-[black] py-2'>
                                                                                            <div>
                                                                                                <p className='text-[25px] font-[600]'>{profileitems.Full_Name}</p>
                                                                                            </div>

                                                                                            <div className='me-2'>
                                                                                                <button className='bg-[rgb(67,26,108)] px-4 py-2 rounded-[20px] text-white'>View Profile</button>
                                                                                            </div>
                                                                                        </div>


                                                                                        <div className=' py-2'>
                                                                                            <p className='text-[15px] font-[600] mb-2'>Age : <span className='font-[300] text-[14px]'>{profileitems.Age} Years</span></p>
                                                                                            <p className='text-[15px] font-[600] mb-2'>Religion : <span className='font-[300] text-[14px]'>{profileitems.Religion}</span></p>
                                                                                            <p className='text-[15px] font-[600] mb-2'>Caste : <span className='font-[300] text-[14px]'>{profileitems.Caste}</span></p>
                                                                                            <p className='text-[15px] font-[600] mb-2'>Mother Tongue : <span className='font-[300] text-[14px]'>{profileitems.Mother_Tongue}</span></p>
                                                                                            {
                                                                                                usersprofessional === undefined || usersprofessional.length === 0 ?
                                                                                                    <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                                                                                                        No Data Found
                                                                                                    </div> :
                                                                                                    usersprofessional.map((professionalitems, index) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                {
                                                                                                                    professionalitems.Sub_id === items._id ? <>
                                                                                                                        <p className='text-[15px] font-[600] mb-2'>Highest Education : <span className='font-[300] text-[14px]'>{professionalitems.Highest_Education}</span></p>
                                                                                                                        <p className='text-[15px] font-[600] mb-2'>Occupation : <span className='font-[300] text-[14px]'>{professionalitems.Occupation_Name}</span></p>
                                                                                                                    </> :
                                                                                                                        null
                                                                                                                }
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                            }


                                                                                            {
                                                                                                usersresidential === undefined || usersresidential.length === 0 ?
                                                                                                    <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                                                                                                        No Data Found
                                                                                                    </div> :
                                                                                                    usersresidential.map((usersresidentialitems, index) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                {
                                                                                                                    usersresidentialitems.Sub_id === items._id ? <>
                                                                                                                        <p className='text-[15px] font-[600] mb-2'>Location : <span className='font-[300] text-[14px]'>{usersresidentialitems.State} / {usersresidentialitems.District}</span></p>
                                                                                                                    </> :
                                                                                                                        null
                                                                                                                }
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </> :
                                                                                null
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                    }

                                                </section>
                                            </>
                                        )

                                    })
                            }

                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}
