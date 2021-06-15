import {ThunkAction} from "redux-thunk";
import {AppThunkType} from "./redux-store";
import {authAPI} from "../API/api";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";
import {changeTodoListEntityStatusAC} from "./todolists-reducer";
import {addTaskAC} from "./tasks-reducer";
import {setIsLoggedInAC} from "../features/Login/login-reducer";

enum ACTIONS_APP_TYPE {
    SET_STATUS = 'sate/app-reducer/set-status',
    SET_ERROR = 'sate/app-reducer/set-error',
    SET_INITIALIZED = 'sate/app-reducer/set-initialized'
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: StatusesActionsType) => {
    switch (action.type) {
        case ACTIONS_APP_TYPE.SET_STATUS:
            return {...state, status: action.status}
        case ACTIONS_APP_TYPE.SET_ERROR:
            return {...state, error: action.error}
        case ACTIONS_APP_TYPE.SET_INITIALIZED:
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}

//actions
export const setAppStatus = (status: statusType) => {
    return {
        type: ACTIONS_APP_TYPE.SET_STATUS,
        status
    } as const
}
export const setAppError = (error: null | string) => {
    return {
        type: ACTIONS_APP_TYPE.SET_ERROR,
        error
    } as const
}
export const setAppInitialized = (initialized: boolean) => {
    return {
        type: ACTIONS_APP_TYPE.SET_INITIALIZED,
        initialized
    } as const
}

export const appInitialized = (): AppThunkType => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitialized(true))
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}

//types
export type StatusesActionsType = ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppInitialized>
export type statusType = 'idle' | 'loading' | 'succeeded' | 'addition' | 'failed'
export type InitialStateType = {
    status: statusType
    error: string | null
    initialized: boolean
}
