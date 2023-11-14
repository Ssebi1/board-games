import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import GamesStyle from '../style/games.module.css'
import {AiOutlinePlusCircle} from "react-icons/ai";
import {createGame, getGame, reset, resetGame, updateGame} from "../features/games/gamesSlice";

function GamePage({type}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { id } = useParams();

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {game, isLoadingGame, isErrorGame, isSuccessGame, messageGame} = useSelector((state) => state.games)
    const [formData, setFormData] = useState({
        title: '',
        rules: '',
        min_players: '2',
        max_players: '2'
    })
    const [gameChanged, setGameChanged] = useState(false)

    useEffect(() => {
        // if the user is not admin, redirect to home page
        if (!user || user.type !== 'admin') {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        // get the game by id from backend if the type is view or edit
        if (type === 'view' || type === 'edit') {
            dispatch(getGame(id))
        }
    }, [])

    // when the game is fetched, set the form data
    useEffect(() => {
        if (!game) {
            return
        }
        if (type === 'view' || type === 'edit') {
            setFormData((prevState) => ({
                ...prevState,
                title: game.title,
                rules: game.rules,
                min_players: game.min_players,
                max_players: game.max_players
            }))
        }
    }, [game])

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    useEffect(() => {
        if (isErrorGame) {
            toast.error(messageGame)
        } else if (isSuccessGame && gameChanged) {
            navigate('/games')
            toast.success('Game saved')
        }

        dispatch(resetGame())
    }, [game, messageGame, isSuccessGame, isErrorGame, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    if (isLoadingAuth || isLoadingGame) {
        return <Spinner />
    }

    const submit = () => {
        // if type is add, create game, else update game
        if (type === 'add') {
            dispatch(createGame(formData))
            setGameChanged(true)
        } else if (type === 'edit') {
            formData['id'] = id
            dispatch(updateGame(formData))
            setGameChanged(true)
        }
    }

    return (
        <>
            <Topbar user={user} activeTile={''}/>
            <div className='contentContainer'>
                <div className={GamesStyle.addContainer}>
                    { type === 'view' ? (
                        <div className={GamesStyle.addTitle}>View game</div>
                    ) : type === 'edit' ? (
                        <div className={GamesStyle.addTitle}>Edit game</div>
                    ) : (
                        <div className={GamesStyle.addTitle}>Add new game</div>
                    )}
                    <div className={GamesStyle.formInputs}>
                        <div className={GamesStyle.addItem}>
                            <label className={GamesStyle.addItemLabel}>Title</label>
                            <input type='text' className={GamesStyle.addItemInput} name='title' value={formData.title} onChange={onChange} disabled={type === 'view'}/>
                        </div>
                        <div className={GamesStyle.addItem}>
                            <label className={GamesStyle.addItemLabel}>Players</label>
                            <div className={GamesStyle.playersInput}>
                                <input type='number' className={GamesStyle.addItemInput} min={2} name='min_players' value={formData.min_players} onChange={onChange} disabled={type === 'view'}/>
                                <div>to</div>
                                <input type='number' className={GamesStyle.addItemInput} min={2} name='max_players' value={formData.max_players} onChange={onChange} disabled={type === 'view'}/>
                            </div>
                        </div>
                        <div className={GamesStyle.addItem}>
                            <label className={GamesStyle.addItemLabel}>Rules</label>
                            <textarea type='text' className={GamesStyle.addItemInput} rows={8} value={formData.rules} name='rules' onChange={onChange} disabled={type === 'view'}/>
                        </div>
                    </div>
                    { type === 'view' ? null : (
                        <div className={GamesStyle.addButton} onClick={submit}>Submit</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default GamePage