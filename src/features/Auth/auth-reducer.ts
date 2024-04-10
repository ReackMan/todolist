import { authAPI } from '../../api/todolists-api'
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasks } from '../TodolistsList/tasks-reducer'
import { clearTodolists } from '../TodolistsList/todolists-reducer'
import { ThunkError } from '../../utils/types'
import { LoginParamsType } from '../../api/types'
import { appActions } from '../CommonActions/App'

const { setAppStatus } = appActions

// thunks
export const login = createAsyncThunk<undefined, LoginParamsType, ThunkError>(
    'auth/loginTC',
    async (param: LoginParamsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
        try {
            const res = await authAPI.login(param)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({ status: 'success' }))
                return
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err) {
            // @ts-ignore
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    },
)

export const logout = createAsyncThunk('auth/logoutTC', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({ status: 'success' }))
            thunkAPI.dispatch(clearTasks())
            thunkAPI.dispatch(clearTodolists())
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err) {
        // @ts-ignore
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})

export const asyncActions = {
    login,
    logout,
}

// reducer
export const slice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
    },
})

export const { setIsLoggedIn } = slice.actions
