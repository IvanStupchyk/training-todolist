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
        setAppStatus(state, action: PayloadAction<{status: statusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{initialized: boolean}>) {
            state.initialized = action.payload.initialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions
// export const appReducer = (state: InitialStateType = initialState, action: StatusesActionsType) => {
//     switch (action.type) {
//         case ACTIONS_APP_TYPE.SET_STATUS:
//             return {...state, status: action.status}
//         case ACTIONS_APP_TYPE.SET_ERROR:
//             return {...state, error: action.error}
//         case ACTIONS_APP_TYPE.SET_INITIALIZED:
//             return {...state, initialized: action.initialized}
//         default:
//             return state
//     }
// }

//actions
// export const setAppStatus = (status: statusType) => {
//     return {
//         type: ACTIONS_APP_TYPE.SET_STATUS,
//         status
//     } as const
// }
// export const setAppError = (error: null | string) => {
//     return {
//         type: ACTIONS_APP_TYPE.SET_ERROR,
//         error
//     } as const
// }
// export const setAppInitialized = (initialized: boolean) => {
//     return {
//         type: ACTIONS_APP_TYPE.SET_INITIALIZED,
//         initialized
//     } as const
// }

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
