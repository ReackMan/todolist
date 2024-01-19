import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    error: null as string | null,
    isInitialized: false
}


// thunks
export const setAppIsInitializedTC = createAsyncThunk('app/setAppIsInitialized',
    async (arg, thunkAPI) => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}))
        } else {
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
        }
        thunkAPI.dispatch(setAppIsInitializedAC({isInitialized: true}))
    })


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: AppStatusType }>) {
            state.status = action.payload.status
        },
        setAppIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setAppIsInitializedAC} = slice.actions


// thunks
export const setAppIsInitializedTC_ = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                dispatch(setIsLoggedInAC({value: false}))
            }
            dispatch(setAppIsInitializedAC({isInitialized: true}))
        })
}


// types
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitialStateType = ReturnType<typeof appReducer>
//     status: AppStatusType
//     error: string | null
//     isInitialized: boolean
// }
export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
