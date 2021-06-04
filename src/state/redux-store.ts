import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))


