import axios from 'axios'

const API_URL = '/api/events'

// Get events
const getEvents = async (token) => {
    let response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

// Get event
const getEvent = async (id, token) => {
    let response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

// Create event
const createEvent = async (data, token) => {
    let response = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const deleteEvent = async (id, token) => {
    let response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

// Update game
const updateEvent = async (id, data, token) => {
    let response = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}


const eventsService = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
}

export default eventsService