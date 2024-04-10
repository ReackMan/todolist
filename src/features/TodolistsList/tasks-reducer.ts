import { todolistsAPI } from '../../api/todolists-api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { asyncActions as todolistsAsyncActions } from './todolists-reducer'
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from '../../utils/error-utils'

import { AppStateType, ThunkError } from '../../utils/types'
import { TaskType, UpdateTaskModelType } from '../../api/types'
import { appActions } from '../CommonActions/App'

const { setAppStatus } = appActions

// thunks
const fetchTasks = createAsyncThunk<{ tasks: TaskType[]; tlId: string }, string, ThunkError>(
    'tasks/fetchTasks',
    async (tlId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.getTasks(tlId)
            thunkAPI.dispatch(setAppStatus({ status: 'success' }))
            return { tasks: res.data.items, tlId }
        } catch (err) {
            // @ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    },
)
const removeTask = createAsyncThunk<{ tlId: string; taskId: string }, { tlId: string; taskId: string }, ThunkError>(
    'tasks/removeTask',
    async (param: { tlId: string; taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.deleteTask(param.tlId, param.taskId)
            thunkAPI.dispatch(setAppStatus({ status: 'success' }))
            return { taskId: param.taskId, tlId: param.tlId }
        } catch (err) {
            // @ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    },
)
const addTask = createAsyncThunk<TaskType, { title: string; tlId: string }, ThunkError>(
    'tasks/addTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.createTask(param.title, param.tlId)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({ status: 'success' }))
                return res.data.data.item
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err) {
            //@ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI, false)
        }
    },
)
const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (param: { tlId: string; taskId: string; model: UpdateDomainTaskModelType }, thunkAPI) => {
        const state = thunkAPI.getState() as AppStateType
        const task = state.tasks[param.tlId].find((t) => t.id === param.taskId)
        console.log(task)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
        }
        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.model,
        }
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.updateTask(apiModel, param.tlId, param.taskId)
            if (res.data.resultCode === 0) {
                // thunkAPI.dispatch(updateTaskAC({tlId, taskId, model}))
                thunkAPI.dispatch(setAppStatus({ status: 'success' }))
                return param
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err) {
            // @ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    },
)

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask,
}

// reducer
export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TaskStateType,
    reducers: {
        clearTasks: () => {
            return {}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(todolistsAsyncActions.addTodolist.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(todolistsAsyncActions.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsAsyncActions.fetchTodolists.fulfilled, (state, action) => {
                action.payload.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.tlId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.tlId].findIndex((t) => t.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.tlId].splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.todoListId].unshift(action.payload)
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if (action.payload) {
                    const tasks = state[action.payload.tlId]
                    // @ts-ignore
                    const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                    if (index > -1) {
                        tasks[index] = { ...tasks[index], ...action.payload.model }
                    }
                }
            })
    },
})

export const { clearTasks } = slice.actions

// types
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    // completed: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TaskStateType = {
    [p: string]: TaskType[]
}
