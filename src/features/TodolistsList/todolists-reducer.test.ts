import {v1} from "uuid";
import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC,
    FilterValuesType, removeTodolistTC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {AppStatusType} from "../../App/app-reducer";


let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({id: todolistId1},
        'requestId', todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)


})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const param = {
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }

    const endState = todolistsReducer(startState, addTodolistTC.fulfilled(param, 'requestId',
        newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')


})

test('correct todolist should change his name', () => {

    let title = 'New Todolist'

    const param = {
        id: todolistId2,
        title
    }

    const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled(param, 'requestId',
        param))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)


})

test('correct filter of todolist should be changed', () => {

    let filter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC({
        id: todolistId2,
        filter
    }))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)


})

test('todolist should be set to the state', () => {

    const endState = todolistsReducer([], fetchTodolistsTC.fulfilled(startState, 'requestId'))

    expect(endState.length).toBe(2)


})


test('correct status of todolist should be changed', () => {

    let status: AppStatusType = 'loading'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({
        id: todolistId2,
        status
    }))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(status)


})

