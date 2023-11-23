import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import gamesReducer from '../features/games/gamesSlice'
import eventsReducer from '../features/events/eventsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    events: eventsReducer,
  },
});
