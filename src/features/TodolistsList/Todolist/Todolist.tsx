import React from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { Task } from './Task/Task'
import { useTodolist } from './hooks/useTodolist'
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer'
import { Button, IconButton, Paper } from '@mui/material'
import { TaskType } from '../../../api/types'

export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    demo?: boolean
}

export type ButtonColorType = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined

export const Todolist = React.memo((props: TodolistPropsType) => {
    let { tasksForTodolist, removeTodolistHandler, addTaskHandler, onTlTitleChange, onFilterButtonClickHandler } =
        useTodolist(props)

    const renderFilterButton = (buttonFilter: FilterValuesType, color: ButtonColorType, text: string) => {
        return (
            <Button
                variant={props.todolist.filter === buttonFilter ? 'contained' : 'text'}
                color={color}
                onClick={() => onFilterButtonClickHandler(buttonFilter)}
            >
                {text}
            </Button>
        )
    }

    return (
        <Paper style={{ padding: '10px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={onTlTitleChange} />
                <IconButton
                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                    onClick={removeTodolistHandler}
                    disabled={props.todolist.entityStatus === 'loading'}
                >
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'} />
            <ul>
                {!tasksForTodolist.length ? (
                    <span style={{ marginLeft: '10px' }}>Create your first task</span>
                ) : (
                    tasksForTodolist.map((t) => <Task key={t.id} task={t} tlId={props.todolist.id} />)
                )}
            </ul>
            <div>
                {renderFilterButton('all', 'error', 'All')}
                {renderFilterButton('active', 'primary', 'Active')}
                {renderFilterButton('completed', 'success', 'Completed')}
            </div>
        </Paper>
    )
})
