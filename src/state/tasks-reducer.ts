import {
    ACTIONS_TODOLIST_TYPE,
    addTodoListType,
    changeTodoListEntityStatusAC,
    deleteTodoListType,
    getTodoListsType,
} from "./todolists-reducer";
import {taskAPI, taskType, updateTaskModelType} from "../API/api";
import {AppRootState, AppThunkType} from "./redux-store";
import {setAppError, setAppStatus, statusType} from "./app-reducer";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";

export enum ACTIONS_TYPE {
    DELETE_TASK = 'todoList/tasks-reducer/delete-task',
    ADD_TASK = 'todoList/tasks-reducer/add-task',
    UPDATE_TASK = 'todoList/tasks-reducer/update-task',
    SET_TASKS = 'todoList/tasks-reducer/set-tasks',
    CHANGE_TASK_STATUS = 'todoList/tasks-reducer/change-task-status',
}

export let initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: tasksActionsType): TasksStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_TASKS:
            return {...state, [action.todoListId]: action.tasks.map(t => ({...t, taskStatus: 'new'}))}
        case ACTIONS_TYPE.ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, taskStatus: 'new'}, ...state[action.task.todoListId]]
            }
        case ACTIONS_TYPE.UPDATE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, ...action.apiModel} : t)
            }
        case ACTIONS_TYPE.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    taskStatus: action.taskStatus
                } : t)
            }
        case ACTIONS_TYPE.DELETE_TASK:
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
            return {...state, [action.payload.todoList.id]: []}
        case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
            delete state[action.todoListId]
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

//actions
export const deleteTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: ACTIONS_TYPE.DELETE_TASK,
        taskId,
        todoListId
    } as const
}
export const addTaskAC = (task: taskType) => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        task
    } as const
}
export const updateTaskAC = (todoListId: string, taskId: string, apiModel: updateTaskModelType) => {
    return {
        type: ACTIONS_TYPE.UPDATE_TASK,
        taskId,
        todoListId,
        apiModel
    } as const
}
export const setTasksAC = (tasks: Array<taskType>, todoListId: string) => {
    return {
        type: ACTIONS_TYPE.SET_TASKS,
        tasks,
        todoListId
    } as const
}
export const changeTaskStatus = (taskStatus: taskStatusType, todoListId: string, taskId: string) => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_STATUS,
        taskStatus,
        todoListId,
        taskId
    } as const
}

//thunks
export const setTasksTC = (todoListId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    taskAPI.getTask(todoListId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todoListId))
            dispatch(setAppStatus('succeeded'))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    dispatch(changeTaskStatus('deletion', todoListId, taskId))
    dispatch(setAppStatus('loading'))
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(taskId, todoListId))
            dispatch(setAppStatus('succeeded'))
        })
}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListId, 'addition'))
    taskAPI.addTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
                dispatch(changeTodoListEntityStatusAC(todoListId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
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
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: updateDomainTaskModelType): AppThunkType =>
    (dispatch, getState: () => AppRootState) => {
        dispatch(setAppStatus('loading'))
        dispatch(changeTaskStatus('edition', todoListId, taskId))
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
                    dispatch(updateTaskAC(todoListId, taskId, apiModel))
                    dispatch(changeTaskStatus('succeeded', todoListId, taskId))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleNetworkError(error, dispatch)
            })
    }

//types
export type deleteTaskType = ReturnType<typeof deleteTaskAC>
export type addTaskType = ReturnType<typeof addTaskAC>
export type setTasksType = ReturnType<typeof setTasksAC>
export type updateTaskType = ReturnType<typeof updateTaskAC>
export type changeTaskStatusType = ReturnType<typeof changeTaskStatus>

export type tasksActionsType = deleteTaskType
    | addTaskType
    | updateTaskType
    | deleteTodoListType
    | addTodoListType
    | getTodoListsType
    | setTasksType
    | changeTaskStatusType

export type taskStatusType = 'new' | 'addition' | 'deletion' | 'edition' | 'succeeded'

export type TaskWideVersionType = taskType & {
    taskStatus: taskStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskWideVersionType>
}

