import {setAppError, setAppStatus, setErrorType, setStatusType} from "../state/app-reducer";
import {addUpdateTaskType} from "../API/api";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

export const handleServerAppError = (response: addUpdateTaskType, dispatch: Dispatch<setStatusType | setErrorType>) => {
    if (response.messages.length) {
        dispatch(setAppError(response.messages[0]))
    } else {
        dispatch(setAppError('some server error'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleNetworkError = (error: {message: string}, dispatch: Dispatch<setStatusType | setErrorType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('idle'))
}