import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";

function Client() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.type !== 'client') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    const logoutAction = () => {
        dispatch(logout())
        navigate('/')
    }

    if (isLoadingAuth) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user}/>
            <div>
            </div>
        </>
    )
}

export default Client