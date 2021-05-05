import {v1} from "uuid";
import {todoListID1, todoListID2} from "./todolists-reducer";
import {ACTIONS_TASK_TYPE, ActionsTaskType} from "./tasks-actions";
import {ACTIONS_TODOLIST_TYPE} from "./todolists-actions";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export let initialState: TasksStateType = {
    [todoListID1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ],
    [todoListID2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Bread', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType): TasksStateType => {
    switch (action.type) {
        case ACTIONS_TASK_TYPE.DELETE_TASK:
            state[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return {...state}
        case ACTIONS_TASK_TYPE.ADD_TASK:
            let task: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.todoListID]: [task, ...state[action.todoListID]]
            }
        case ACTIONS_TASK_TYPE.CHANGE_TASK_STATUS:
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: !t.isDone} : {...t})
            return {...state}
        case ACTIONS_TASK_TYPE.CHANGE_TASK_TITLE:
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, ...action.payload} : {...t})
            return {...state}
        case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
            return {...state, [action.todoListID]: []}
        case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
            delete state[action.todoListID]
        default:
            return {...state}
    }
}



