import { TaskStateType, slice as tasksSlice } from './tasks-reducer'
import { TodolistDomainType, slice as todolistsSlice } from './todolists-reducer'
import { v1 } from 'uuid'
import { todolistsActions } from './'

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const param = {
        id: v1(),
        title: 'new todolist',
        addedDate: '',
        order: 0,
    }

    const action = todolistsActions.addTodolist.fulfilled(param, 'requestId', param.title)
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})
