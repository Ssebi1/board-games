import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gamesService from './gamesService'


const initialState = {
    games: [],
    game: null,
    isErrorGames: false,
    isSuccessGames: false,
    isLoadingGames: false,
    messageGames: '',
}

export const getGames = createAsyncThunk('games/get', async (args, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await gamesService.getGames(token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createGame = createAsyncThunk('games/create', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await gamesService.createGame(data, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingGames = false
            state.isSuccessGames = false
            state.isErrorGames = false
            state.messageGames = ''
            state.games = []
            state.game = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGames.pending, (state) => {
                state.isLoadingGames = true
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.isLoadingGames = false
                state.isSuccessGames = true
                state.isErrorGames = false
                state.games = action.payload
            })
            .addCase(getGames.rejected, (state, action) => {
                state.isLoadingGames = false
                state.isErrorGames = true
                state.messageGames= action.payload
                state.games = null
            })
            .addCase(createGame.pending, (state) => {
                state.isLoadingGames = true
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.isLoadingGames = false
                state.isSuccessGames = true
                state.isErrorGames = false
                state.game = action.payload
                state.games.unshift(action.payload)
            })
            .addCase(createGame.rejected, (state, action) => {
                state.isLoadingGames = false
                state.isErrorGames = true
                state.messageGames = action.payload
            })
    },
})

export const { reset } = gamesSlice.actions
export default gamesSlice.reducer