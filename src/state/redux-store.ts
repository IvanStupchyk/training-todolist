import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListActionsType, todoListsReducer} from "./todolists-reducer";
import {tasksActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk"

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export type AppActionsType = tasksActionsType | todoListActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootState,
    unknown,
    AppActionsType>

export const store = createStore(rootReducer, applyMiddleware(thunk))


