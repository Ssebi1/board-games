import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import React from 'react';

function Landing() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user) {
            if (user.type === 'client')
                navigate('/client')
            else
                navigate('/admin')
        } else {
            navigate('/login')
        }
    }, [user, navigate, dispatch])

    return (<></>)
}

export default Landing