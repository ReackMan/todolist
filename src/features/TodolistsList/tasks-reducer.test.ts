import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, TaskStateType, updateTaskTC} from "./tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TaskStateType

beforeEach(() => {
    todolistId1 = 'todolistId1'
    todolistId2 = 'todolistId2'
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'HTML&CSS', status: TaskStatuses.New, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
        ],
    }
})


test('correct task should be removed from correct todolist', () => {

    let param = {
        taskId: '2',
        tlId: 'todolistId2'
    };
    const endState = tasksReducer(startState, removeTaskTC.fulfilled(param, 'requestId', param))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()


})

test('correct task should be added to correct todolist', () => {

    const param = {
        description: '',
        title: 'juice',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        id: v1(),
        addedDate: '',
        order: 0
    }

    const endState = tasksReducer(startState, addTaskTC.fulfilled(param, 'requestId',
        { title: 'juice', tlId: 'todolistId2' }))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)


})

test('correct task status from correct todolist should be changed', () => {

    const param = {
        tlId: 'todolistId2', taskId: '2', model: {
            description: '',
            title: 'juice',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: ''
        }
    }

    const endState = tasksReducer(startState, updateTaskTC.fulfilled(param, 'requestId', param))

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)

})

test('correct task title from correct todolist should be changed', () => {

    const param = {
        tlId: 'todolistId2', taskId: '2', model: {
            description: '',
            title: 'juice',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: ''
        }
    }

    const endState = tasksReducer(startState, updateTaskTC.fulfilled(param, 'requestId', param))

    expect(endState['todolistId2'][1].title).toBe('juice')
    expect(endState['todolistId1'][1].title).toBe('JS')

})

test('new property with new array should be added when new todolist is added', () => {

    const param = {
        id: v1(),
        title: 'new todolist',
        addedDate: '',
        order: 0
    }

    const endState = tasksReducer(startState, addTodolistTC.fulfilled(param, 'requestId', 'new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')

    if (!newKey) {
        throw new Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])

})

test('property with tlId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistTC.fulfilled({id: 'todolistId2'},
        'requestId', 'todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()

})

test('empty arrays should be added when we set todolists', () => {

    const param = [
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0}
    ]

    const endState = tasksReducer({}, fetchTodolistsTC.fulfilled(param, 'requestId'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})

test('tasks should be added for todolist', () => {

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, fetchTasksTC.fulfilled({tasks: startState['todolistId1'], tlId: 'todolistId1'}, 'requestId', 'todolistId1'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)

})


