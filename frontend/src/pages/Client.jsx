import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';

function Client() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
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
        <div>
            { user ? (
                <>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>{user.type}</div>
                    <button onClick={logoutAction}>Logout</button>
                </>
            ) : (<></>)}

        </div>
    )
}

export default Client