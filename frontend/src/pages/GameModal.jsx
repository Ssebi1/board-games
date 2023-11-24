import React, {useEffect, useRef, useState} from 'react';
import GamesClientsStyle from '../style/games-clients.module.css'
import {MdClose, MdPeopleAlt} from "react-icons/md";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getGame, reset, resetGame} from "../features/games/gamesSlice";
import Spinner from "../components/Spinner";
import Topbar from "../components/Topbar";

function GameModal() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let {id} = useParams()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, game, isLoadingGame, isErrorGame, messageGame, isSuccessGame} = useSelector((state) => state.games)

    useEffect(() => {
        dispatch(getGame(id))

        return () => {
            dispatch(resetGame())
            dispatch(reset())
        }
    }, [])

    if (isLoadingGame) {
        return <Spinner/>
    }

    if (!game) {
        return null
    }

    return (
        <>
        <Topbar user={user}/>
        <div className={GamesClientsStyle.gameModalContainer} style={{marginTop: '30px'}}>
            <Link to={'/client/games'} className={GamesClientsStyle.closeModal}><MdClose /></Link>
            <div className={GamesClientsStyle.gameTitle}>{game.title}</div>
            <div className={GamesClientsStyle.gameRules}>{game.rules}</div>
            <div className={GamesClientsStyle.gamePlayers}><MdPeopleAlt /> {game.min_players}-{game.max_players}</div>
        </div>
        </>
    )
}

export default GameModal