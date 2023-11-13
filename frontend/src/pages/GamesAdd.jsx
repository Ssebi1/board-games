import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import GamesStyle from '../style/games.module.css'
import {AiOutlinePlusCircle} from "react-icons/ai";
import {createGame, reset} from "../features/games/gamesSlice";

function GamesAdd() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {game, isLoadingGames, isErrorGames, isSuccessGames, messageGames} = useSelector((state) => state.games)
    const [formData, setFormData] = useState({
        title: '',
        rules: '',
        min_players: '2',
        max_players: '2'
    })

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    useEffect(() => {
        if (isErrorGames) {
            toast.error(messageGames)
        } else if (game && isSuccessGames) {
            navigate('/games')
            toast.success('Game successfully added')
        }

        dispatch(reset())
    }, [game, messageGames, isSuccessGames, isErrorGames, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    if (isLoadingAuth || isLoadingGames) {
        return <Spinner />
    }

    const createGameSubmit = () => {
        dispatch(createGame(formData))
    }

    return (
        <>
            <Topbar user={user} activeTile={''}/>
            <div className='contentContainer'>
                <div className={GamesStyle.addContainer}>
                    <div className={GamesStyle.addTitle}>Add new game</div>
                    <div className={GamesStyle.formInputs}>
                        <div className={GamesStyle.addItem}>
                            <label className={GamesStyle.addItemLabel}>Title</label>
                            <input type='text' className={GamesStyle.addItemInput} name='title' value={formData.title} onChange={onChange}/>
                        </div>
                        <div className={GamesStyle.addItem}>
                            <label className={GamesStyle.addItemLabel}>Players</label>
                            <div className={GamesStyle.playersInput}>
                                <input type='number' className={GamesStyle.addItemInput} min={2} name='min_players' value={formData.min_players} onChange={onChange}/>
                                <div>to</div>
                                <input type='number' className={GamesStyle.addItemInput} min={2} name='max_players' value={formData.max_players} onChange={onChange}/>
                            </div>
                        </div>
                        <div className={GamesStyle.addItem}>
                            <label className={GamesStyle.addItemLabel}>Rules</label>
                            <textarea type='text' className={GamesStyle.addItemInput} rows={8} value={formData.rules} name='rules' onChange={onChange}/>
                        </div>
                    </div>
                    <div className={GamesStyle.addButton} onClick={createGameSubmit}>Submit</div>
                </div>
            </div>
        </>
    )
}

export default GamesAdd