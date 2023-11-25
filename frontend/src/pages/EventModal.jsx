import React, {useEffect, useState} from 'react';
import EventsStyle from '../style/events.module.css'
import {RiVipCrown2Fill} from "react-icons/ri";
import {FaMapLocation} from "react-icons/fa6";
import {BsFillCalendar2DateFill} from "react-icons/bs";
import {IoIosTime} from "react-icons/io";
import {useSelector} from "react-redux";
import {getGames} from "../features/games/gamesSlice";
import {useDispatch} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import GamesClientsStyle from "../style/games-clients.module.css";
import {MdClose} from "react-icons/md";
import Spinner from "../components/Spinner";
import Select from "react-select";
import {deleteEvent, getEvent, reset, resetEvent, updateEvent} from "../features/events/eventsSlice";
import {IoGameController, IoPersonSharp} from "react-icons/io5";
import {FaBan, FaCheck, FaGamepad} from "react-icons/fa";
import Topbar from "../components/Topbar";
import toast from "react-hot-toast";

function EventModal() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let {id} = useParams()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, isLoadingGames, isErrorGames, messageGames, isSuccessGames} = useSelector((state) => state.games)
    const {event, isLoadingEvent, isErrorEvent, messageEvent, isSuccessEvent} = useSelector((state) => state.events)
    const [suggestedGames, setSuggestedGames] = React.useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    const [isSuggestedDisabled, setIsSuggestedDisabled] = useState(false)

    useEffect(() => {
        console.log(id)
        dispatch(getEvent(id))
        dispatch(getGames())

        return () => {
            dispatch(resetEvent())
            dispatch(reset())
        }
    }, [])

    useEffect(() => {
        if (games && isSuccessGames) {
            let newGamesOptions = []
            games.map((game) => {
                newGamesOptions.push({value: game._id, label: game.title})
            })
            setSuggestedGames(newGamesOptions)
        }
    }, [games, isSuccessGames])

    useEffect(() => {
        if (event && isSuccessEvent) {
            if (event.host._id === user._id) {
                setIsOwner(true)
            }
            setIsJoined(false)
            event.participants.map((participant) => {
                if (participant._id === user._id) {
                    setIsJoined(true)
                }
            })
        }
    }, [event, isSuccessEvent])

    const sendUpdateEvent = (e) => {
        let current_games_ids = event.suggested_games.map((game) => {
            return game._id
        })
        let games_ids = e.map((game) => {
            return game.value
        })
        const data = {
            id: event._id,
            suggested_games: games_ids.concat(current_games_ids)
        }
        dispatch(updateEvent(data))
    }

    const selectEventGame = (e) => {
        const data = {
            id: event._id,
            game: e.value
        }
        dispatch(updateEvent(data))
    }

    const selectEventGame2 = (game_id) => {
        const data = {
            id: event._id,
            game: game_id
        }
        dispatch(updateEvent(data))
    }

    const removeGame = (e) => {
        let current_games_ids = event.suggested_games.map((game) => {
            return game._id
        })
        let games_ids = current_games_ids.filter((game) => {
            return game !== e
        })
        const data = {
            id: event._id,
            suggested_games: games_ids
        }
        dispatch(updateEvent(data))
    }

    const joinEvent = () => {
        let current_participants_ids = event.participants.map((user) => {
            return user._id
        })
        const data = {
            id: event._id,
            participants: current_participants_ids.concat(user._id)
        }
        dispatch(updateEvent(data))
    }

    const leaveEvent = () => {
        let current_participants_ids = event.participants.map((user) => {
            return user._id
        })
        let participants_ids = current_participants_ids.filter((part) => {
            return part !== user._id
        })
        const data = {
            id: event._id,
            participants: participants_ids
        }
        dispatch(updateEvent(data))
    }

    const deleteEventAction = () => {
        dispatch(deleteEvent(id))
        navigate('/events')
        toast.success('Event deleted successfully')
    }

    const removeParticipant = (user_id) => {
        let current_participants_ids = event.participants.map((user) => {
            return user._id
        })
        let participants_ids = current_participants_ids.filter((part) => {
            return part !== user_id
        })
        const data = {
            id: event._id,
            participants: participants_ids
        }
        dispatch(updateEvent(data))
    }

    const startEvent = () => {
        const data = {
            id: event._id,
            status: 'started'
        }
        dispatch(updateEvent(data))
    }

    const endEvent = () => {
        const data = {
            id: event._id,
            status: 'ended'
        }
        dispatch(updateEvent(data))
    }

    if (isLoadingGames || isLoadingAuth || isLoadingEvent) {
        return <Spinner/>
    }

    if (!event) {
        return null
    }

    return (
        <>
        <Topbar user={user}/>
        <div className={EventsStyle.eventModalContainer} style={{marginTop: '30px'}}>
            <Link to={'/events'} className={EventsStyle.closeModal}><MdClose /></Link>
            <div className={EventsStyle.eventModalTitle}>{event.title}</div>
            <div>
                <div className={EventsStyle.label}>Game</div>
                <Select
                    name="game"
                    options={suggestedGames}
                    className="basic-select"
                    classNamePrefix="select"
                    onChange={(e) => {selectEventGame(e)}}
                    value={{value: event.game ? event.game._id : null, label: event.game ? event.game.title : null}}
                    isDisabled={!isOwner || event.status !== 'created'}
                />
            </div>
            <div>
                <div className={EventsStyle.label}>Players</div>
                <div className={EventsStyle.eventModalPlayers}>
                    <div className={EventsStyle.eventHost}><RiVipCrown2Fill /> {event.host.name}</div>
                    {event.participants.map((user) => {
                        if (isOwner && event.status === 'created')
                            return (
                                <div className={EventsStyle.eventHost}><IoPersonSharp /> {user.name} <FaBan style={{color: 'mediumvioletred', cursor: 'pointer'}} onClick={() => {removeParticipant(user._id)}}/></div>
                            )
                        else {
                            return (
                                <div className={EventsStyle.eventHost}><IoPersonSharp /> {user.name}</div>
                            )
                        }
                    })}
                </div>
            </div>
            <div>
                <div className={EventsStyle.label}>Suggested games</div>
                <div className={EventsStyle.eventModalSuggestedGames}>
                    {event.suggested_games.map((game) => {
                        if (isOwner && event.status === 'created') {
                            return (
                                <div className={EventsStyle.eventHost}><FaGamepad /> {game.title} <FaBan style={{color: 'mediumvioletred', cursor: 'pointer'}} onClick={() => {removeGame(game._id)}}/> <FaCheck style={{color: 'green', cursor: 'pointer'}} onClick={() => {selectEventGame2(game._id)}}/></div>                            )
                        } else {
                            return (
                                <div className={EventsStyle.eventHost}><FaGamepad /> {game.title}</div>
                            )
                        }
                    })}
                </div>
            </div>
            <div>
                <div className={EventsStyle.label}>Suggest a game</div>
                <Select
                    isMulti
                    name="suggested_games"
                    options={suggestedGames}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {sendUpdateEvent(e)}}
                    value={null}
                    isDisabled={!(isOwner || (!isOwner && isJoined)) || event.status !== 'created'}
                />
            </div>
            <div className={EventsStyle.eventRow}>
                <div className={EventsStyle.eventDate}><BsFillCalendar2DateFill /> {event.date.split('T')[0]}</div>
                <div className={EventsStyle.eventTime}><IoIosTime /> {event.time}</div>
                <div className={EventsStyle.eventModalLocation}><FaMapLocation /> {event.location}</div>
            </div>
            <div className={EventsStyle.eventRow} style={{margin: '0 auto', marginTop: '30px'}}>
                { isOwner ? (
                    <>
                        { event.status === 'created' ? (
                            <button className={EventsStyle.eventModalButton} onClick={startEvent}>Start</button>
                            ) : (
                                <></>
                            )}
                            { event.status === 'started' ? (
                                <button className={EventsStyle.eventModalButton} onClick={endEvent}>End</button>
                            ) : (
                                <></>
                            )
                        }

                        { event.status !== 'ended' && event.status !== 'started' ? (
                            <button className={EventsStyle.eventModalButton} onClick={deleteEventAction}>Delete</button>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                    { !isJoined ? (
                            <button className={EventsStyle.eventModalButton} onClick={joinEvent}>Join</button>
                        ) : (
                            <button className={EventsStyle.eventModalButton} onClick={leaveEvent}>Leave</button>
                        )
                    }
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default EventModal