import {createSlice , configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false
        },
    }
        
});
export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});
