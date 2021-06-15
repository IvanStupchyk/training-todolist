import {setAppError, setAppStatus} from "../state/app-reducer";
import {ResponseType} from "../API/api";
import {Dispatch} from "redux";

type handleServerAppErrorDispatchType = ReturnType<typeof setAppError> | ReturnType<typeof setAppStatus>
export const handleServerAppError = <D>(response: ResponseType<D>, dispatch: Dispatch<handleServerAppErrorDispatchType>) => {
    if (response.messages.length) {
        dispatch(setAppError(response.messages[0]))
    } else {
        dispatch(setAppError('some server error'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleNetworkError = (error: {message: string}, dispatch: Dispatch<handleServerAppErrorDispatchType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('idle'))
}