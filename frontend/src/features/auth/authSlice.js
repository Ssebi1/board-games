import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isErrorAuth: false,
    isSuccessAuth: false,
    isLoadingAuth: false,
    messageAuth: '',
}

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Register user
export const updateUser = createAsyncThunk('auth/update', async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.updateUser(data, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingAuth = false
            state.isSuccessAuth = false
            state.isErrorAuth = false
            state.messageAuth = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = false
                state.isErrorAuth = true
                state.messageAuth = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.isSuccessAuth = false
                state.messageAuth = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.isSuccessAuth = false
                state.messageAuth = action.payload
                state.user = null
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoadingAuth = true
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer