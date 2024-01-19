import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {
    AppStatusType,
    setAppStatusAC
} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export let todolistId1 = v1()
export let todolistId2 = v1()

let initialState: TodolistDomainType[] = []

// thunks
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.getTodolists()
            thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
            return res.data
        } catch (err) {
            // @ts-ignore
            const error: AxiosError = err
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist',
    async (tlId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({id: tlId, status: 'loading'}))
        try {
            const res = await todolistsAPI.deleteTodolist(tlId)
            thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
            return {id: tlId}
        } catch (err) {
            // @ts-ignore
            const error: AxiosError = err
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const addTodolistTC = createAsyncThunk('todolists/addTodolist',
    async (title: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
                return res.data.data.item
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
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',
    async (param: { title: string, id: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.updateTodolist(param.title, param.id)
            if (res.data.resultCode === 0) {
                // thunkAPI.dispatch(changeTodolistTitleAC({id: param.id, title: param.title}))
                thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
                return {id: param.id, title: param.title}
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
    name: 'todolists',
    initialState: initialState,
    reducers: {
        // removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     if (index > -1) {
        //         state.splice(index, 1)
        //     }
        //     // state.filter(tl => tl.id !== action.payload.id)
        // },
        // addTodolistAC(state, action: PayloadAction<TodolistType>) {
        //     state.unshift({...action.payload, filter: 'all', entityStatus: "idle"})
        // },
        // changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     state[index].title = action.payload.title
        // },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: AppStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        // setTodolistsAC(state, action: PayloadAction<TodolistType[]>) {
        //     // {...action.todolist, filter: 'all', entityStatus: "idle"}, ...state
        //     return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            // state.unshift({...action.payload, filter: 'all', entityStatus: "idle"})
            state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC
} = slice.actions


// thunks
export const fetchTodolistsTC_ = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then((res) => {
            // dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC({status: 'success'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC_ = (tlId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: tlId, status: 'loading'}))
    todolistsAPI.deleteTodolist(tlId)
        .then(res => {
            // dispatch(removeTodolistAC({id: tlId}))
            dispatch(setAppStatusAC({status: 'success'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC_ = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                // dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC_ = (title: string, id: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolist(title, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                // dispatch(changeTodolistTitleAC({id: id, title: title}))
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
// export type AddTodolistAction = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>
// export type SetTodolistsAction = ReturnType<typeof setTodolistsAC>

export type TodolistActionsType =
    // | ReturnType<typeof removeTodolistAC>
    // | ReturnType<typeof addTodolistAC>
    // | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    // | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: AppStatusType }
// type ThunkDispatch = Dispatch<TodolistActionsType | SetAppErrorActionType | SetAppStatusActionType>


