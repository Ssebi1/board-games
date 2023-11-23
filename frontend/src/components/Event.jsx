import React from 'react';
import EventsStyle from '../style/events.module.css'
import {RiVipCrown2Fill} from "react-icons/ri";
import {FaMapLocation} from "react-icons/fa6";
import {BsFillCalendar2DateFill} from "react-icons/bs";
import {IoIosTime} from "react-icons/io";

function Event({event, setEventSelected}) {
    return (
        <div className={EventsStyle.eventContainer} onClick={() => {setEventSelected(event)}}>
            <div className={EventsStyle.eventTitle}>{event.title}</div>
            <div className={EventsStyle.eventHost}><RiVipCrown2Fill /> {event.host.name}</div>
            <div className={EventsStyle.eventLocation}><FaMapLocation /> {event.location}</div>
            <div className={EventsStyle.eventRow}>
                <div className={EventsStyle.eventDate}><BsFillCalendar2DateFill /> {event.date.split('T')[0]}</div>
                <div className={EventsStyle.eventTime}><IoIosTime /> {event.time}</div>
            </div>
        </div>
    )
}

export default Event