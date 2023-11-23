import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import EventAddStyle from '../style/event-add.module.css'
import {reset} from "../features/games/gamesSlice";
import {MdClose} from "react-icons/md";
import AccountStyle from "../style/account.module.css";

import Papa from 'papaparse';
import regionsFile from '../data/romania_regions.csv'
import {createEvent, resetEvent} from "../features/events/eventsSlice";

function EventAdd() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {event, isLoadingEvent, isErrorEvent, isSuccessEvent, messageEvent} = useSelector((state) => state.events)
    const [regions, setRegions] = useState([])

    const [formData, setFormData] = useState({
        title: '',
        location: 'Bucuresti',
        date: new Date().toISOString().split("T")[0],
        time: ''
    })

    useEffect(() => {
        Papa.parse(regionsFile, {
            download: true,
            complete: function (input) {
                setRegions(input.data)
            }
        });
    }, [])

    useEffect(() => {

        return () => {
            resetEvent()
        }
    }, [])

    useEffect(() => {
        if (!user || user.type !== 'client') {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    useEffect(() => {
        if (isErrorEvent) {
            toast.error(messageEvent)
            resetEvent()
        }
        if (isSuccessEvent) {
            toast.success('Event created successfully!')
            navigate('/events')
        }
    }, [isErrorEvent, isSuccessEvent, messageEvent, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submit = () => {
        dispatch(createEvent(formData))
    }

    if (isLoadingAuth) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user} activeTile={'badges'}/>
            <div className={EventAddStyle.container}>
                <Link to={'/events'} className={EventAddStyle.closeModal}><MdClose /></Link>
                <div className={EventAddStyle.title}>Create event</div>
                <div className={EventAddStyle.inputRow}>
                    <label className={EventAddStyle.inputLabel}>Title</label>
                    <input type='text' name='title' className={EventAddStyle.input} value={formData.title} onChange={onChange}/>
                </div>
                <div className={EventAddStyle.inputRow}>
                    <div className={AccountStyle.infoItem}>
                        <label className={EventAddStyle.inputLabel}>Location</label>
                        <select className={AccountStyle.infoItemInput} value={formData.location} name='location' defaultValue={formData.location} onChange={onChange}>
                            {regions.map((region) => {
                                return <option value={region[0]}>{region[0]}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className={EventAddStyle.doubleInputRow}>
                    <div className={EventAddStyle.doubleInputElement}>
                        <label className={EventAddStyle.inputLabel}>Date</label>
                        <input type='date' name='date' className={EventAddStyle.input} min={new Date().toISOString().split("T")[0]} value={formData.date} onChange={onChange}/>
                    </div>
                    <div className={EventAddStyle.doubleInputElement}>
                        <label className={EventAddStyle.inputLabel}>Time</label>
                        <input type='time' name='time' className={EventAddStyle.input} value={formData.time} onChange={onChange}/>
                    </div>
                </div>
                <div className={EventAddStyle.addButton} onClick={submit}>Submit</div>
            </div>
        </>
    )
}

export default EventAdd