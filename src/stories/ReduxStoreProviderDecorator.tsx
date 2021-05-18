import {Provider} from "react-redux";
import React from "react";
import {AppRootState, store} from "../state/redux-store";
import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

let initialGlobalState = {
    todoLists: [
        {id: 'todoListID1', title: 'What to learn', filter: 'all'},
        {id: 'todoListID2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todoListID1']: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        ['todoListID2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}