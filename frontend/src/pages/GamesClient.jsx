import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import {getGames, reset} from "../features/games/gamesSlice";
import GamesClientsStyle from '../style/games-clients.module.css'
import GameClient from "../components/GameClient";
import GameModal from "../components/GameModal";

function GamesClients() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, isLoadingGames, isErrorGames, isSuccessGames, messageGames} = useSelector((state) => state.games)
    const [gameSelected, setGameSelected] = React.useState(null)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        dispatch(getGames())
    }, [])

    useEffect(() => {
        if (!user || user.type !== 'client') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    if (isLoadingAuth || isLoadingGames) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user} activeTile={'badges'}/>
            <div className='contentContainer' style={{flexDirection: 'column'}}>
                { gameSelected ? (
                    <GameModal game={gameSelected} setGameSelected={setGameSelected}/>
                ) : (
                    <>
                        <div className={GamesClientsStyle.title}>Recommended games</div>
                                <div className={GamesClientsStyle.gamesContainer}>
                            {games && games.map((game) => (
                                <GameClient game={game} setGameSelected={setGameSelected}/>
                            ))}
                        </div>
                        <div className={GamesClientsStyle.title}>All games</div>
                        <div className={GamesClientsStyle.gamesContainer}>
                            {games && games.map((game) => (
                                <GameClient game={game} setGameSelected={setGameSelected}/>
                            ))}
                        </div>
                    </>
                    )
                }

            </div>
        </>
    )
}

export default GamesClients