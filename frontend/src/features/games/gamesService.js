import axios from 'axios'

const API_URL = '/api/games/'

// Get games
const getGames = async (token) => {
    let response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

// Create game
const createGame = async (data, token) => {
    let response = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const deleteGame = async (id, token) => {
    let response = await axios.delete(`${API_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}


const gamesService = {
    getGames,
    createGame,
    deleteGame
}

export default gamesService