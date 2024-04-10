import { asyncActions as tasksAsyncActions } from './tasks-reducer'
import { asyncActions as todolistsAsyncActions } from './todolists-reducer'
import { slice as todolistsSlice } from './todolists-reducer'
import { slice as tasksSlice } from './tasks-reducer'
import { TodolistsList } from './TodolistsList'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions,
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions,
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

export type TodolistActionsType =
    | ReturnType<typeof todolistsActions.changeTodolistFilter>
    | ReturnType<typeof todolistsActions.changeTodolistEntityStatus>

export { tasksActions, todolistsActions, TodolistsList, todolistsReducer, tasksReducer }
