import React from 'react';
import {action} from "@storybook/addon-actions";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskStateType} from "../tasks-reducer";


type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    removeTodolist: (tlId: string) => void
    removeTask: (taskId: string, tlId: string) => void
    changeFilter: (value: FilterValuesType, tlId: string) => void
    addTask: (newTitle: string, tlId: string) => void
    changeTaskStatus: (t: TaskType, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (value: string, t: TaskType, tlId: string) => void
    changeTodolistTitle: (value: string, tlId: string) => void
}

export default {
    title: 'Todolist Component',
    component: Todolist
}

let initialState = {
    todolist: {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0,
        entityStatus: "idle"} as TodolistDomainType,
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
        ],
    } as TaskStateType
}
let todolist = initialState.todolist
let tasksForTodolist = initialState.tasks['todolistId1']

const addTaskCallback = action('Task was added')
const changeTodolistTitleCallback = action('Todolist title was changed')
const removeTaskCallback = action('Task was removed')
const changeFilterCallback = action('Filter was changed')
const changeTaskStatusCallback = action('Status was changed')
const removeTodolistCallback = action('Todolist was removed')
const changeTaskTitleCallback = action('Task title was removed')


export const TodolistBaseExample = (props: any) => {
    return <Todolist tasks={tasksForTodolist}
                     addTask={addTaskCallback}
                     changeTodolistTitle={changeTodolistTitleCallback}
                     removeTask={removeTaskCallback}
                     changeFilter={changeFilterCallback}
                     changeTaskStatus={changeTaskStatusCallback}
                     removeTodolist={removeTodolistCallback}
                     changeTaskTitle={changeTaskTitleCallback}
                     todolist={todolist}/>
}
