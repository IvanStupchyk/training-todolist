import {v1} from "uuid";
import {
    ACTIONS_TODOLIST_TYPE,
    addTodoListType,
    deleteTodoListType,
    todoListID1,
    todoListID2
} from "./todolists-reducer";

export enum ACTIONS_TYPE {
    DELETE_TASK = 'todoList/tasks-reducer/delete-task',
    ADD_TASK = 'todoList/tasks-reducer/add-task',
    CHANGE_TASK_STATUS = 'todoList/tasks-reducer/change-task-status',
    CHANGE_TASK_TITLE = 'todoList/tasks-reducer/change-task-title',
}

type deleteTaskType = {
    type: ACTIONS_TYPE.DELETE_TASK
    taskID: string
    todoListID: string
}

type addTaskType = {
    type: ACTIONS_TYPE.ADD_TASK
    todoListID: string
    payload: { title: string }
}

type changeTaskStatusType = {
    type: ACTIONS_TYPE.CHANGE_TASK_STATUS
    taskID: string
    todoListID: string
}

type changeTaskTitleType = {
    type: ACTIONS_TYPE.CHANGE_TASK_TITLE
    taskID: string
    todoListID: string
    payload: { title: string }
}

export const deleteTaskAC = (taskID: string, todoListID: string): deleteTaskType => {
    return {
        type: ACTIONS_TYPE.DELETE_TASK,
        taskID,
        todoListID
    }
}

export const addTaskAC = (title: string, todoListID: string): addTaskType => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        todoListID,
        payload: {title}
    }
}

export const changeTaskStatusAC = (taskID: string, todoListID: string): changeTaskStatusType => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_STATUS,
        taskID,
        todoListID
    }
}

export const changeTaskTitleAC = (title: string, taskID: string, todoListID: string): changeTaskTitleType => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_TITLE,
        taskID,
        todoListID,
        payload: {title}
    }
}

export type tasksActionsType = deleteTaskType | addTaskType | changeTaskStatusType | changeTaskTitleType | deleteTodoListType | addTodoListType

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

export const tasksReducer = (state: TasksStateType = initialState, action: tasksActionsType): TasksStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.ADD_TASK:
            let task: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.todoListID]: [task, ...state[action.todoListID]]
            }
        case ACTIONS_TYPE.CHANGE_TASK_STATUS:
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {
                ...t,
                isDone: !t.isDone
            } : t)
            return {...state}
        case ACTIONS_TYPE.CHANGE_TASK_TITLE:
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, ...action.payload} : t)
            return {...state}
        case ACTIONS_TYPE.DELETE_TASK:
            state[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return {...state}
        case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
            return {
                ...state,
                [action.todoListID]: []
            }
        case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
            delete state[action.todoListID]
            return {...state}
        default:
            return state
    }
}






