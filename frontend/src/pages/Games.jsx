import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import GamesStyle from '../style/games.module.css'
import {AiFillDelete, AiFillEdit, AiOutlineEye, AiOutlinePlusCircle} from "react-icons/ai";
import {deleteGame, getGames, reset, resetGame} from "../features/games/gamesSlice";
import GamesTable from "../components/GamesTable";

function Games() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, isLoadingGames, isErrorGames, isSuccessGames, messageGames, isSuccessGame, isErrorGame, messageGame, isLoadingGame} = useSelector((state) => state.games)

    useEffect(() => {
        dispatch(getGames())

        return () => {
            reset()
        }
    }, [])

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    useEffect(() => {
        if (isErrorGame) {
            toast.error(messageGames)
        } else if (isSuccessGame) {
            toast.success('Game deleted')
        }
        dispatch(resetGame())
    }, [isSuccessGame, isErrorGame, messageGame, dispatch])

    const deleteGameAction = (id) => {
        dispatch(deleteGame(id))
    }

    if (isLoadingAuth || isLoadingGames || isLoadingGame) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user} activeTile={'games'}/>
            <div className='contentContainer' style={{flexDirection: 'column'}}>
                <div className={GamesStyle.header}>
                    <div className={GamesStyle.name}>Available games</div>
                    <Link to={'/games/add'} className={GamesStyle.add}><AiOutlinePlusCircle/> Add new</Link>
                </div>
                <GamesTable games={games} limit={1000} showActions={true} deleteGameAction={deleteGameAction}/>
            </div>
        </>
    )
}

export default Games