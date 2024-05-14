import axiosInstance from '@/helpers/axios-instance';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './skeletons/loader';

function UnprotectedRoute() {
    const [data, setData] = useState({
        _id: localStorage.getItem("userId") || '',
        token: '',
        loading: true
    })

    useEffect(() => {
        async function fetchToken() {
            try {
                const res = await axiosInstance.get(`/api/auth/check/${data._id}`)
                setData({
                    ...data,
                    token: res.data?.data,
                    loading: false
                })
            } catch (error) {
                setData({
                    ...data,
                    token: '',
                    loading: false
                })
            }
        }
        fetchToken()
    }, [])

    if (data.loading) {
        return <><Loader /></>; // Render a loading indicator
    }

    return data.token ? <Navigate to="/" /> : <Outlet />;
}

export default UnprotectedRoute
