import React from 'react'
import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { api, getCookie } from '../../../url/Url'

export function PlanVerification() {
    let navigate = useNavigate()

    let viewplans = () => {
        try {
            api.post('/view-payment-history', { User_id: getCookie('User_Id') }, {
                headers: {
                    Authorization: getCookie('Registertoken')
                }
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.viewdata === null || res.data.Status === 0) {
                        return navigate('/membership-plans')
                    }
                    else {
                        return null
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

    useEffect(() => {
        viewplans();
    }, [])
}
