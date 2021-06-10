enum ACTIONS_TYPE {
    SET_STATUS = 'sate/app-reducer/set-status',
    SET_ERROR = 'sate/app-reducer/set-error'
}

export type statusType = 'idle' | 'loading' | 'succeeded' | 'addition' | 'failed'

export type InitialStateType = {
    status: statusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: StatusesActionsType) => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_STATUS:
            return {...state, status: action.status}
        case ACTIONS_TYPE.SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export type setStatusType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: statusType) => {
    return {
        type: ACTIONS_TYPE.SET_STATUS,
        status
    } as const
}

export type setErrorType = ReturnType<typeof setAppError>
export const setAppError = (error: null | string) => {
    return {
        type: ACTIONS_TYPE.SET_ERROR,
        error
    } as const
}

export type StatusesActionsType = setStatusType | setErrorType
