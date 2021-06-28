import {authAPI} from "../API/api";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";
import {setIsLoggedIn} from "../features/Login/login-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: statusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
            state.initialized = action.payload.initialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions

export const appInitialized = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitialized({initialized: true}))
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}

//types
export type statusType = 'idle' | 'loading' | 'succeeded' | 'addition' | 'failed'
export type InitialStateType = {
    status: statusType
    error: string | null
    initialized: boolean
}
