enum ACTIONS_TYPE {
    SET_STATUS = 'sate/app-reducer/set-status',
    SET_ERROR = 'sate/app-reducer/set-error'
}

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

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

type setStatusType = ReturnType<typeof setStatus>
export const setStatus = (status: statusType) => {
    return {
        type: ACTIONS_TYPE.SET_STATUS,
        status
    } as const
}

type setErrorType = ReturnType<typeof setError>
export const setError = (error: null | string) => {
    return {
        type: ACTIONS_TYPE.SET_ERROR,
        error
    } as const
}

export type StatusesActionsType = setStatusType | setErrorType
