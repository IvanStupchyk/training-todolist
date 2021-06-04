import {Provider} from "react-redux";
import React from "react";
import {AppRootState, store} from "../state/redux-store";
import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/api";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})


let initialGlobalState = {
    todoLists: [
        {id: 'todoListID1', title: 'What to learn', filter: 'all', addedDate: '', order: 2}
    ],
    tasks: {
        ['todoListID1']: [
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
                status: TaskStatuses.New
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
                status: TaskStatuses.New
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
                status: TaskStatuses.New
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}