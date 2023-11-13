import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gamesService from './gamesService'


const initialState = {
    games: [],
    game: null,
    isErrorGames: false,
    isSuccessGames: false,
    isLoadingGames: false,
    isSuccessGame: false,
    isLoadingGame: false,
    messageGames: '',
    messageGame: ''
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

export const deleteGame = createAsyncThunk('restaurants/delete/soft', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await gamesService.deleteGame(id, token)
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
        },
        resetGame: (state) => {
            state.isLoadingGame = false
            state.isSuccessGame = false
            state.isErrorGame = false
            state.messageGame = ''
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
                state.messageGames = action.payload
                state.games = null
            })
            .addCase(createGame.pending, (state) => {
                state.isLoadingRestaurant = true
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.isLoadingGame = false
                state.isSuccessGame = true
                state.isErrorGame = false
                state.game = action.payload
                state.games.unshift(action.payload)
            })
            .addCase(createGame.rejected, (state, action) => {
                state.isLoadingGame = false
                state.isErrorGame = true
                state.messageGame = action.payload
            })
            .addCase(deleteGame.pending, (state) => {
                state.isLoadingGame = true
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.isLoadingGame = false
                state.isSuccessGame = true
                state.isErrorGame = false
                state.games = state.games.filter(function( game ) {
                    return game._id !== action.payload.id;
                });
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.isLoadingGame = false
                state.isErrorGame = true
                state.messageGame = action.payload
            })
    },
})

export const { reset, resetGame } = gamesSlice.actions
export default gamesSlice.reducer