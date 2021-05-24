import axios from 'axios'
import {settings} from "cluster";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '528fa1c0-cacc-47ff-ae93-32ce73ccde7f'
    }
})

type todoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}


export const todoListAPI = {
    getTodoLists() {
        return instance.get<Array<todoListType>>('todo-lists')
    },

    createTodoList(title: string) {
        return instance.post<ResponseType<{item: todoListType}>>(`todo-lists`, {title: title})
    },

    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },

    updateTodoList (todoListId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todoListId}`, {title: title})
    }
}

type taskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type tasksType = {
    item: Array<taskType>
    totalCount: number
    error: string
}

type addUpdateTaskType = {
    data: {
        item: Array<taskType>
    }
    resultCode: number
    messages: Array<string>
}

type deleteTaskType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<tasksType>(`todo-lists/${todolistId}/tasks`)
    },

    addTask(todolistId: string, title: string) {
        return instance.post<addUpdateTaskType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<deleteTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<addUpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }
}