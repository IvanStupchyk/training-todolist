import {combineReducers} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk"
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

// export type AppActionsType = tasksActionsType | todoListActionsType | StatusesActionsType | authActionsType
//
// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
//     AppRootState,
//     unknown,
//     AppActionsType>

// export const store = createStore(rootReducer, applyMiddleware(thunk))


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})