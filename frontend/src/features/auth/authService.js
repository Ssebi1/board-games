import axios from 'axios'

const API_URL = '/api/auth/'

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

// Register user
const updateUser = async (data, token) => {
    const response = await axios.put(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


const authService = {
    login,
    register,
    logout,
    updateUser
}

export default authService