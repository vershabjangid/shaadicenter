import React, { useEffect, useState } from 'react'
import { api, getCookie } from '../../../url/Url'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/Loader';

export function DashPrivate() {
    let [isAuthenticated, setisAuthenticated] = useState(null)


    const removeCookie = (key) => {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    let navigate = useNavigate()
    let SessionExpired = () => {
        try {
            api.post('/check-admin-session')
                .then((res) => {
                    if (res.data.Status === 1) {
                        localStorage.setItem('authenticate', JSON.stringify(true))
                        setisAuthenticated(true)
                    }
                    else {
                        localStorage.setItem('authenticate', JSON.stringify(false))
                        setisAuthenticated(false)
                        removeCookie('AdminToken')
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

    useEffect(() => {
        SessionExpired()
    })



    if (isAuthenticated === null && getCookie('AdminToken')) {
        return <Loader value={"/dashboard"} />
    }

    else if (isAuthenticated === true && getCookie('AdminToken')) {
        return <Outlet />
    }

    else {
        return <Navigate to={"/dash-login"} />
    }

}
