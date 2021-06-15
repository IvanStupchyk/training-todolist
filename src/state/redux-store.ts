import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListActionsType, todoListsReducer} from "./todolists-reducer";
import {tasksActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk"
import {appReducer, StatusesActionsType} from "./app-reducer";
import {authActionsType, authReducer} from "../features/Login/login-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export type AppActionsType = tasksActionsType | todoListActionsType | StatusesActionsType | authActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootState,
    unknown,
    AppActionsType>

export const store = createStore(rootReducer, applyMiddleware(thunk))


