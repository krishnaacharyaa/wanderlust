import axiosInstance from '@/helpers/axios-instance';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './skeletons/loader';

function RequireAuth({ allowedRole }: { allowedRole: string[] }) {
    const [data, setData] = useState({
        _id: localStorage.getItem("userId") || '',
        role: localStorage.getItem("role") || '',
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

    return data.token && allowedRole.find((myRole) => myRole === data.role) ? (
        <Outlet />
    ) : <Navigate to={'/signin'} />
}

export default RequireAuth
