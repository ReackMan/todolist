import { v1 } from 'uuid'
import { todolistsAPI } from '../../api/todolists-api'
import { AppStatusType } from '../Application/application-reducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from '../../utils/error-utils'
import { ThunkError } from '../../utils/types'
import { TodolistType } from '../../api/types'
import { appActions } from '../CommonActions/App'

export let todolistId1 = v1()
export let todolistId2 = v1()

const { setAppStatus } = appActions

// thunks
const fetchTodolists = createAsyncThunk<TodolistType[], undefined, ThunkError>(
    'todolists/fetchTodolists',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.getTodolists()
            thunkAPI.dispatch(setAppStatus({ status: 'success' }))
            return res.data
        } catch (err) {
            // @ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    },
)
const removeTodolist = createAsyncThunk<{ id: string }, string, ThunkError>(
    'todolists/removeTodolist',
    async (tlId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        thunkAPI.dispatch(changeTodolistEntityStatus({ id: tlId, status: 'loading' }))
        try {
            const res = await todolistsAPI.deleteTodolist(tlId)
            thunkAPI.dispatch(setAppStatus({ status: 'success' }))
            return { id: tlId }
        } catch (err) {
            // @ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    },
)
const addTodolist = createAsyncThunk<TodolistType, string, ThunkError>(
    'todolists/addTodolist',
    async (title: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.createTodolist(title)
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
const changeTodolistTitle = createAsyncThunk(
    'todolists/changeTodolistTitle',
    async (param: { title: string; id: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await todolistsAPI.updateTodolist(param.title, param.id)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({ status: 'success' }))
                return { id: param.id, title: param.title }
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
    fetchTodolists,
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
}

// reducer
export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        clearTodolists: () => {
            return []
        },
        changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; status: AppStatusType }>) {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
    },
})

export const { changeTodolistEntityStatus, changeTodolistFilter, clearTodolists } = slice.actions

// types

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType; entityStatus: AppStatusType }
