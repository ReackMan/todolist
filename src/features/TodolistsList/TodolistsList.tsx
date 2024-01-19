import React from "react";
import {useTodolistsList, UseTodolistsListPropsType} from "./hooks/useTodolistsList";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Navigate} from "react-router-dom";

export const TodolistsList: React.FC<UseTodolistsListPropsType> = (props) => {

    let {
        todolists, tasks, isLoggedIn,
        removeTask, changeTaskStatus, changeTaskTitle, addTask,
        removeTodolist, changeTodolistTitle, addTodolist, changeFilter
    } = useTodolistsList(props)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3} style={{padding: '20px'}}>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id]
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <Todolist key={tl.id}
                                      tasks={tasksForTodolist}
                                      addTask={addTask}
                                      changeTodolistTitle={changeTodolistTitle}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      changeTaskStatus={changeTaskStatus}
                                      removeTodolist={removeTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      demo={props.demo}
                                      todolist={tl}/>
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}