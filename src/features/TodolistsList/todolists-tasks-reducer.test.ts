import {tasksReducer, TaskStateType} from "./tasks-reducer";
import {addTodolistTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {

    const startTasksState: TaskStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const param = {
        id: v1(),
        title: 'new todolist',
        addedDate: '',
        order: 0
    }

    const action = addTodolistTC.fulfilled(param, 'requestId', param.title)
    const endTasksState = tasksReducer(startTasksState,
        action)
    const endTodolistsState = todolistsReducer(startTodolistsState,
        action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})