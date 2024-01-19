import {Dispatch} from "redux";
import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType,
    { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('auth/loginTC',
    async (param: LoginParamsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.login(param)
            if (res.data.resultCode === 0) {
                // thunkAPI.dispatch(setIsLoggedInAC({value: true}))
                thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
                return {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            // @ts-ignore
            const error: AxiosError = err
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logoutTC = createAsyncThunk('auth/logoutTC',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
                return {value: false}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            // @ts-ignore
            const error: AxiosError = err
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


// thunks
export const loginTC_ = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC_ = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
// type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>

