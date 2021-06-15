import axios from 'axios'

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

export type ResponseType<D> = {
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
        return instance.post<ResponseType<{item: todoListType}>>(`todo-lists`, {title})
    },

    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoListId}`)
    },

    updateTodoList (todoListId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todoListId}`, {title})
    }
}

export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type taskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type tasksType = {
    items: Array<taskType>
    totalCount: number
    error: string
}


// type deleteTaskType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }

export type updateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const taskAPI = {
    getTask(todoListId: string) {
        return instance.get<tasksType>(`todo-lists/${todoListId}/tasks`)
    },

    addTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{item: taskType}>>(`todo-lists/${todoListId}/tasks`, {title: title})
    },

    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },

    updateTask(todoListId: string, taskId: string, model: updateTaskModelType) {
        return instance.put<ResponseType<{item: taskType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, {...model})
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
export const authAPI = {
    login(params: LoginParamsType) {
        return instance.post<ResponseType<{userId?: number}>>('auth/login', {...params})
    },
    logOut() {
        return instance.delete<ResponseType<{}>>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    }
}