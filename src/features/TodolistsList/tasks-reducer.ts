import {Dispatch} from "redux";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {AppStateType} from "../../App/redux-store";
import {setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const UPDATE_TASK = 'UPDATE-TASK'
const SET_TASKS = 'SET-TASKS'

const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const SET_TODOLISTS = 'SET-TODOLISTS'

let initialState: TaskStateType = {}


// thunks
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
    async (tlId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTasks(tlId);
        thunkAPI.dispatch(setAppStatusAC({status: 'success'}));
        return {tasks: res.data.items, tlId};
    })

export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async (param: { tlId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.deleteTask(param.tlId, param.taskId)
        thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
        return {taskId: param.taskId, tlId: param.tlId}
    })

export const addTaskTC = createAsyncThunk('tasks/addTask',
    async (param: { title: string, tlId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.createTask(param.title, param.tlId)
            if (res.data.resultCode === 0) {
                // thunkAPI.dispatch(addTaskAC(res.data.data.item))
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

export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (param: { tlId: string, taskId: string, model: UpdateDomainTaskModelType },
           thunkAPI) => {
        // const task = getState().tasks[tlId].find(t => t.id === taskId)
        //@ts-ignore
        const state: AppStateType = thunkAPI.getState()
        const task = state.tasks[param.tlId].find(t => t.id === param.taskId)
        console.log(task)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.model
        }
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.updateTask(apiModel, param.tlId, param.taskId)
            if (res.data.resultCode === 0) {
                // thunkAPI.dispatch(updateTaskAC({tlId, taskId, model}))
                thunkAPI.dispatch(setAppStatusAC({status: 'success'}))
                return {tlId: param.tlId, taskId: param.taskId, model: param.model}
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

// reducer
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // addTaskAC(state, action: PayloadAction<TaskType>) {
        //     state[action.payload.todoListId].unshift(action.payload)
        // },
        // updateTaskAC(state, action: PayloadAction<{ tlId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
        //     const tasks = state[action.payload.tlId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks[index] = {...tasks[index], ...action.payload.model}
        //     }
        // },
    },
    extraReducers(builder) {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.tlId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.tlId]
                .findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.tlId].splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId].unshift(action.payload)
            }
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.tlId]
                // @ts-ignore
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            }
        })
    }
})

export const tasksReducer = slice.reducer


export const fetchTasksTC_ = (tlId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(tlId)
        .then((res) => {
            // dispatch(setTasksAC({tasks: res.data.items, tlId}))
            dispatch(setAppStatusAC({status: 'success'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC_ = (tlId: string, id: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.deleteTask(tlId, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                // dispatch(removeTaskAC({taskId: id, tlId}))
                dispatch(setAppStatusAC({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC_ = (title: string, tlId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(title, tlId)
        .then(res => {
            if (res.data.resultCode === 0) {
                // dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC_ = (tlId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    async (dispatch: Dispatch, getState: () => AppStateType) => {
        const task = getState().tasks[tlId].find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTask(apiModel, tlId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    // dispatch(updateTaskAC({tlId, taskId, model}))
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
// type ThunkDispatch = Dispatch<TaskActionsType | SetAppErrorActionType | SetAppStatusActionType>

