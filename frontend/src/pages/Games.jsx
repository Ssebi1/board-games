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

function Games() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, isLoadingGames, isErrorGames, isSuccessGames, messageGames} = useSelector((state) => state.games)

    useEffect(() => {
        dispatch(getGames())

        return () => {
            reset()
        }
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    if (isLoadingAuth || isLoadingGames) {
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
                <table className={GamesStyle.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Players</th>
                            <th>Rules</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { games.map((game) => {
                            return(
                                <tr>
                                    <td>{game.title}</td>
                                    <td>{game.min_players}-{game.max_players}</td>
                                    <td>{game.rules.slice(0,30)}</td>
                                    <td className={GamesStyle.actionButtons}>
                                        <span className={GamesStyle.actionButton}><AiFillEdit/></span>
                                        <span className={GamesStyle.actionButton}><AiFillDelete/></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Games