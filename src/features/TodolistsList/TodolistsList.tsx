import React from 'react'
import { useTodolistsList, UseTodolistsListPropsType } from './hooks/useTodolistsList'
import { Grid } from '@mui/material'
import { Todolist } from './Todolist/Todolist'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Navigate } from 'react-router-dom'

export const TodolistsList: React.FC<UseTodolistsListPropsType> = (props) => {
    let { todolists, tasks, isLoggedIn, addTodolistCallback } = useTodolistsList(props)

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <Grid container>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid
                container
                spacing={3}
                style={{ padding: '20px', flexWrap: 'nowrap', overflowX: 'scroll', height: '100%' }}
            >
                {todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]
                    return (
                        <Grid item>
                            <div style={{ width: '300px' }}>
                                <Todolist key={tl.id} tasks={tasksForTodolist} demo={props.demo} todolist={tl} />
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
