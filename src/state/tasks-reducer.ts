import {v1} from "uuid";
import {AddTodoListType, DeleteTodoListType, todoListID1, todoListID2} from "./todolists-reducer";

type DeleteTaskType = {
    type: 'DELETE-TASK'
    taskID: string
    todoListID: string
}

type AddTaskAType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todoListID: string
}

type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    taskID: string
    todoListID: string
}

type ActionsType = DeleteTaskType | AddTaskAType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodoListType | DeleteTodoListType

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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            state[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return {...state}
        case "ADD-TASK":
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListID]: [task, ...state[action.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: !t.isDone} : {...t})
            return {...state}
        case "CHANGE-TASK-TITLE":
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.title} : {...t})
            return {...state}
        case "ADD-NEW-TODOLIST":
            return {...state, [action.todoListId]: []}
        case "DELETE-TODOLIST":
            delete state[action.todoListID]
        default:
            return {...state}
    }
}

export const DeleteTaskAC = (taskID: string, todoListID: string): DeleteTaskType => {
    return {
        type: "DELETE-TASK",
        taskID,
        todoListID
    }
}

export const AddTaskAC = (title: string, todoListID: string): AddTaskAType => {
    return {
        type: "ADD-TASK",
        title,
        todoListID
    }
}

export const ChangeTaskStatusAC = (taskID: string, todoListID: string): ChangeTaskStatusType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todoListID
    }
}

export const ChangeTaskTitleAC = (title: string, taskID: string, todoListID: string): ChangeTaskTitleType => {
    return {
        type: "CHANGE-TASK-TITLE",
        title,
        taskID,
        todoListID
    }
}

