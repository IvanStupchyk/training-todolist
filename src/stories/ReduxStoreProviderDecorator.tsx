import {Provider} from "react-redux";
import React from "react";
import {AppRootState, store} from "../state/redux-store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/api";
import {appReducer} from "../state/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})


let initialGlobalState = {
    todoLists: [
        {id: 'todoListID1', title: 'What to learn', filter: 'all', addedDate: '', order: 2, entityStatus: 'idle'},
        {id: 'todoListID2', title: 'Hello', filter: 'all', addedDate: '', order: 2, entityStatus: 'loading'}
    ],
    tasks: {
        'todoListID1': [
            {
                id: v1(),
                title: '1',
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                status: TaskStatuses.New,
                taskStatus: 'new'
            },
            {
                id: v1(),
                title: '2',
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                status: TaskStatuses.Completed,
                taskStatus: 'new'
            },
            {
                id: v1(),
                title: '3',
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                status: TaskStatuses.New,
                taskStatus: 'new'
            }
        ],
        'todoListID2': []
    },
    app: {
        status: 'idle',
        error: null
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}