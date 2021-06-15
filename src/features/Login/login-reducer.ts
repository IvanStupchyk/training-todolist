import {AppThunkType} from "../../state/redux-store";
import {setAppStatus} from "../../state/app-reducer";
import {authAPI, LoginParamsType} from "../../API/api";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";

export enum ACTIONS_LOGIN_TYPE {
    SETISLOGGEDIN = 'features/Login/login-reducer/set-is-logged-in',
    LOGOUT = 'features/Login/login-reducer/log-out',
}


export let initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: authActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_LOGIN_TYPE.SETISLOGGEDIN:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: ACTIONS_LOGIN_TYPE.SETISLOGGEDIN,
        value
    }
}

//thunks
export const loginTC = (params: LoginParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(params)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}

export const logout = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus('succeeded'))
                dispatch(setIsLoggedInAC(false))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}

//types
type InitialStateType = {
    isLoggedIn: boolean
}

export type authActionsType = ReturnType<typeof setIsLoggedInAC>
