import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import {getEvents, reset} from "../features/events/eventsSlice";
import GameModal from "../components/GameModal";
import EventsStyle from "../style/events.module.css";
import Event from "../components/Event";
import {FaPlus} from "react-icons/fa";

function Events() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {events, isLoadingEvents, isErrorEvents, isSuccessEvents, messageEvents} = useSelector((state) => state.events)
    const [eventSelected, setEventSelected] = React.useState(null)

    useEffect(() => {
        dispatch(getEvents())

        return () => {
            reset()
        }
    }, [])

    useEffect(() => {
        if (!user || user.type !== 'client') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    if (isLoadingAuth || isLoadingEvents) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user} activeTile={'events'}/>
            <div className='contentContainer' style={{flexDirection: 'column'}}>
                { eventSelected ? (
                    <GameModal event={eventSelected} setEventSelected={setEventSelected}/>
                ) : (
                    <>
                        <div className={EventsStyle.header}>
                            <div className={EventsStyle.title}>All events</div>
                            <Link to='/events/add' className={EventsStyle.addEvent}><FaPlus /> Add event</Link>
                        </div>
                        <div className={EventsStyle.container}>
                            {events && events.map((event) => (
                                <Event event={event} setGameSelected={eventSelected}/>
                            ))}
                        </div>
                        <div className={EventsStyle.title}>Past events</div>
                    </>
                )
                }
            </div>
        </>
    )
}

export default Events