import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import GamesStyle from "../style/games.module.css";
import {AiOutlinePlusCircle} from "react-icons/ai";
import GamesTable from "../components/GamesTable";
import {getGames} from "../features/games/gamesSlice";
import {FaChevronRight} from "react-icons/fa";

function Admin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, isLoadingGames, isErrorGames, isSuccessGames, messageGames, isSuccessGame, isErrorGame, messageGame, isLoadingGame} = useSelector((state) => state.games)

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    useEffect(() => {
        // fetch all games
        dispatch(getGames())
    }, [])

    if (isLoadingAuth || isLoadingGames) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user} activeTile={''}/>
            <div className='contentContainer' style={{flexDirection: 'column'}}>
                <div className={GamesStyle.header}>
                    <div className={GamesStyle.name}>Available games</div>
                    <Link to={'/games'} className={GamesStyle.add}>View all <FaChevronRight/></Link>
                </div>
                <GamesTable games={games} limit={5} showActions={false} deleteGameAction={null}/>
            </div>
        </>
    )
}

export default Admin