import {addTodoListAC, changeTodoListEntityStatusAC, deleteTodoListAC, getTodoListsAC} from "./todolists-reducer";
import {taskAPI, taskType, updateTaskModelType} from "../API/api";
import {AppRootState} from "./redux-store";
import {setAppStatus} from "./app-reducer";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export let initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            let index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (index > -1) state[action.payload.todoListId].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<taskType>) {
            state[action.payload.todoListId].unshift({...action.payload, taskStatus: 'new'})
        },
        updateTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string, apiModel: updateTaskModelType }>) {
            let task = state[action.payload.todoListId]
            let index = task.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) task[index] = {...task[index], ...action.payload.apiModel}
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<taskType>, todoListId: string }>) {
            state[action.payload.todoListId] = action.payload.tasks.map(t => ({...t, taskStatus: 'new'}))
        },
        changeTaskStatus(state, action: PayloadAction<{ taskStatus: taskStatusType, todoListId: string, taskId: string }>) {
            let task = state[action.payload.todoListId]
            let index = task.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) task[index].taskStatus = action.payload.taskStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(getTodoListsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(deleteTodoListAC, (state, action) => {
            delete state[action.payload.todoListId]
        })
    }
})

export const tasksReducer = slice.reducer
export const {deleteTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskStatus} = slice.actions

//thunks
export const setTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    taskAPI.getTask(todoListId)
        .then(res => {
            dispatch(setTasksAC({todoListId, tasks: res.data.items}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(changeTaskStatus({todoListId, taskId, taskStatus: 'deletion'}))
    dispatch(setAppStatus({status: 'loading'}))
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => {
            dispatch(deleteTaskAC({taskId, todoListId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: 'addition'}))
    taskAPI.addTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(changeTodoListEntityStatusAC({entityStatus: 'succeeded', todoListId}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(changeTodoListEntityStatusAC({entityStatus: 'succeeded', todoListId}))
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
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: updateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeTaskStatus({todoListId, taskId, taskStatus: 'edition'}))
        const state = getState().tasks[todoListId].find(t => t.id === taskId)

        if (!state) {
            console.warn('Task not found in the state')
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

        taskAPI.updateTask(todoListId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, todoListId, apiModel}))
                    dispatch(changeTaskStatus({todoListId, taskId, taskStatus: 'succeeded'}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleNetworkError(error, dispatch)
            })
    }

//types
export type taskStatusType = 'new' | 'addition' | 'deletion' | 'edition' | 'succeeded'
export type TaskWideVersionType = taskType & {
    taskStatus: taskStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskWideVersionType>
}

