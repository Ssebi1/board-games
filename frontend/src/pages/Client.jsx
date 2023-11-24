import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import GameModal from "./GameModal";
import GamesClientsStyle from "../style/games-clients.module.css";
import GameClient from "../components/GameClient";
import {getRecGames} from "../features/games/gamesSlice";
import EventsStyle from "../style/events.module.css";
import {FaPlus} from "react-icons/fa";
import Event from "../components/Event";
import {getEvents} from "../features/events/eventsSlice";
import {MdOutlineArrowForwardIos} from "react-icons/md";

function Client() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {recGames, isLoadingGames, isErrorGames, isSuccessGames, messageGames} = useSelector((state) => state.games)
    const {events, isLoadingEvents, isErrorEvents, isSuccessEvents, messageEvents} = useSelector((state) => state.events)

    useEffect(() => {
        if (!user || user.type !== 'client') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    useEffect(() => {
        dispatch(getRecGames())
        dispatch(getEvents())
    }, [])

    const logoutAction = () => {
        dispatch(logout())
        navigate('/')
    }

    if (isLoadingAuth || isLoadingGames || isLoadingEvents) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user}/>
            <div className='contentContainer' style={{flexDirection: 'column'}}>
                <div className={EventsStyle.header}>
                    <div className={EventsStyle.title}>Recommended games</div>
                    <Link to='/events' className={EventsStyle.addEvent}>View more <MdOutlineArrowForwardIos /></Link>
                </div>
                <div className={GamesClientsStyle.gamesContainer}>
                    {recGames && recGames.map((game) => (
                        <GameClient game={game} setGameSelected={() => {}} isFavourite={user.pref_games.map((game) => game._id).includes(game._id)}/>
                    ))}
                </div>
                <div className={EventsStyle.header}>
                    <div className={EventsStyle.title}>Recommended events</div>
                    <Link to='/client/games' className={EventsStyle.addEvent}>View more <MdOutlineArrowForwardIos /></Link>
                </div>
                <div className={EventsStyle.container}>
                    {events && events.map((event) => (
                        <Event event={event}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Client