import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "3277cb5c-af39-4da3-bbc5-a0a1211fb89e",
        // 'Access-Control-Allow-Origin' : '*',
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}

const instance = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
} )

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(title: string, id: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },

    getTasks(tlId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${tlId}/tasks`)
    },
    createTask(title: string, tlId: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${tlId}/tasks/`,
            {title: title})
    },
    deleteTask(tlId: string, id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${tlId}/tasks/${id}`)
    },
    updateTask(model: UpdateTaskModelType, tlId: string, id: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${tlId}/tasks/${id}`, model)
    },

}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId?: number}>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    }
}

// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = {field: string, error: string}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldErrorType[]
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    description: string
    title: string
    // completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


