import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventsService from './eventsService'


const initialState = {
    events: [],
    event: null,
    isErrorEvents: false,
    isSuccessEvents: false,
    isLoadingEvents: false,
    isSuccessEvent: false,
    isLoadingEvent: false,
    messageEvents: '',
    messageEvent: ''
}

export const getEvents = createAsyncThunk('events/get', async (args, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventsService.getEvents(token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getEvent = createAsyncThunk('event/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventsService.getEvent(id, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteEvent = createAsyncThunk('event/delete', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventsService.deleteEvent(id, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createEvent = createAsyncThunk('event/create', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(data, token)
        return await eventsService.createEvent(data, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateEvent = createAsyncThunk('event/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const id = data.id
        delete data['id']
        return await eventsService.updateEvent(id, data, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingEvents = false
            state.isSuccessEvents = false
            state.isErrorEvents = false
            state.messageEvents = ''
            state.events = []
        },
        resetEvent: (state) => {
            state.isLoadingEvent = false
            state.isSuccessEvent = false
            state.isErrorEvent = false
            state.messageEvent = ''
            state.event = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.isLoadingEvents = true
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.isLoadingEvents = false
                state.isSuccessEvents = true
                state.isErrorEvents = false
                state.events = action.payload
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.isLoadingEvents = false
                state.isErrorEvents = true
                state.messageEvents = action.payload
                state.events = null
            })
            .addCase(createEvent.pending, (state) => {
                state.isLoadingRestaurant = true
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isLoadingEvent = false
                state.isSuccessEvent = true
                state.isErrorEvent = false
                state.event = action.payload
                state.events.unshift(action.payload)
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.isLoadingEvent = false
                state.isErrorEvent = true
                state.messageEvent = action.payload
            })
            .addCase(deleteEvent.pending, (state) => {
                state.isLoadingEvent = true
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.isLoadingEvent = false
                state.isSuccessEvent = true
                state.isErrorEvent = false
                state.events = state.events.filter(function( event ) {
                    return event._id !== action.payload.id;
                });
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.isLoadingEvent = false
                state.isErrorEvent = true
                state.messageEvent = action.payload
            })
            .addCase(getEvent.pending, (state) => {
                state.isLoadingEvent = true
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.isLoadingEvent = false
                state.isSuccessEvent = true
                state.isErrorEvent = false
                state.event = action.payload
            })
            .addCase(getEvent.rejected, (state, action) => {
                state.isLoadingEvent = false
                state.isErrorEvent = true
                state.messageEvent = action.payload
            })
            .addCase(updateEvent.pending, (state) => {
                state.isLoadingEvent = true
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.isLoadingEvent = false
                state.isSuccessEvent = true
                state.isErrorEvent = false
                state.event = action.payload
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.isLoadingEvent = false
                state.isErrorEvent = true
                state.messageEvent = action.payload
            })
    },
})

export const { reset, resetEvent } = eventsSlice.actions
export default eventsSlice.reducer