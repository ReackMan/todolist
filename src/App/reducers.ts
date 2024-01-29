import { combineReducers } from 'redux'
import { tasksReducer, todolistsReducer } from '../features/TodolistsList'
import { appReducer } from '../features/Application'
import { authReducer } from '../features/Auth'

export let rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
