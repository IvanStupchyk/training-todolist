import {ACTIONS_TODOLIST_TYPE, addTodoListType, deleteTodoListType, getTodoListsType,} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, taskType, updateTaskModelType} from "../API/api";
import {Dispatch} from "redux";
import {AppRootState} from "./redux-store";

export enum ACTIONS_TYPE {
    DELETE_TASK = 'todoList/tasks-reducer/delete-task',
    ADD_TASK = 'todoList/tasks-reducer/add-task',
    UPDATE_TASK = 'todoList/tasks-reducer/update-task',
    SET_TASKS = 'todoList/tasks-reducer/set-tasks',
}

type deleteTaskType = {
    type: ACTIONS_TYPE.DELETE_TASK
    taskID: string
    todoListID: string
}

type addTaskType = {
    type: ACTIONS_TYPE.ADD_TASK
    task: taskType
}

type updateTaskType = {
    type: ACTIONS_TYPE.UPDATE_TASK
    taskID: string
    todoListID: string
    apiModel: updateTaskModelType
}

type setTasksType = {
    type: ACTIONS_TYPE.SET_TASKS
    tasks: Array<taskType>
    todolistId: string
}

export type tasksActionsType = deleteTaskType
    | addTaskType
    | updateTaskType
    | deleteTodoListType
    | addTodoListType
    | getTodoListsType
    | setTasksType


export type TasksStateType = {
    [key: string]: Array<taskType>
}

export let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: tasksActionsType): TasksStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        case ACTIONS_TYPE.ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }
        case ACTIONS_TYPE.UPDATE_TASK:
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {
                ...t,
                ...action.apiModel
            } : t)
            return {...state}
        case ACTIONS_TYPE.DELETE_TASK:
            state[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return {...state}
        case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
            return {
                ...state,
                [action.payload.todoList.id]: []
            }
        case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
            delete state[action.todoListID]
            return {...state}
        case ACTIONS_TODOLIST_TYPE.GET_TODOLISTS:
            let copyState = {...state}

            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            return copyState
        default:
            return state
    }
}

export const deleteTaskAC = (taskID: string, todoListID: string): deleteTaskType => {
    return {
        type: ACTIONS_TYPE.DELETE_TASK,
        taskID,
        todoListID
    }
}

export const addTaskAC = (task: taskType): addTaskType => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        task
    }
}

export const updateTaskAC = (todoListID: string, taskID: string, apiModel: updateTaskModelType): updateTaskType => {
    return {
        type: ACTIONS_TYPE.UPDATE_TASK,
        taskID,
        todoListID,
        apiModel
    }
}

export const setTasksAC = (tasks: Array<taskType>, todolistId: string): setTasksType => {
    return {
        type: ACTIONS_TYPE.SET_TASKS,
        tasks,
        todolistId
    }
}

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTask(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.addTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export type updateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: updateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState().tasks[todolistId].find(t => {
            return t.id === taskId
        })

        if (!state) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: updateTaskModelType = {
            title: state.title,
            description: state.description,
            completed: state.completed,
            status: state.status,
            priority: state.priority,
            startDate: state.startDate,
            deadline: state.deadline,
            ...domainModel
        }

        taskAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, apiModel))
            })
    }



