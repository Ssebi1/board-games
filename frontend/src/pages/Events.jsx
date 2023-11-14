import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import GamesStyle from '../style/games.module.css'
import {AiFillDelete, AiFillEdit, AiOutlinePlusCircle} from "react-icons/ai";
import {getGames, reset} from "../features/games/gamesSlice";

function Events() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getGames())

        return () => {
            reset()
        }
    }, [])

    useEffect(() => {
        if (!user || user.type !== 'client') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    if (isLoadingAuth) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user} activeTile={'badges'}/>
            <div className='contentContainer' style={{flexDirection: 'column'}}>
            </div>
        </>
    )
}

export default Events