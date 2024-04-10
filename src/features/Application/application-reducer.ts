import { authAPI } from '../../api/todolists-api'
import { setIsLoggedIn } from '../Auth/auth-reducer'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { appActions } from '../CommonActions/App'

const { setAppError, setAppStatus } = appActions

// thunks
export const setAppIsInitialized = createAsyncThunk('application/setAppIsInitialized', async (arg, { dispatch }) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ value: true }))
    } else {
        dispatch(setIsLoggedIn({ value: false }))
    }
})

export const asyncActions = {
    setAppIsInitialized,
}

// reducer
export const slice = createSlice({
    name: 'application',
    initialState: {
        status: 'idle',
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        // setAppError(state, action: PayloadAction<{ error: string | null }>) {
        //     state.error = action.payload.error
        // },
        // setAppStatus(state, action: PayloadAction<{ status: AppStatusType }>) {
        //     state.status = action.payload.status
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(setAppIsInitialized.fulfilled, (state, action) => {
                state.isInitialized = true
            })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error
            })
    },
})

// types
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.reducer>
