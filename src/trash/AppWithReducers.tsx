import React, {useReducer} from 'react';
import '../App/App.css';
import {v1} from "uuid";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";

import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {
    changeTodolistFilterAC,
    FilterValuesType,
    todolistsReducer
} from "../features/TodolistsList/todolists-reducer";
//@ts-ignore
//import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../features/TodolistsList/tasks-reducer";


function App() {
    //
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    //
    // let [todolists, dispatchToTodolistsReducer] =
    //     useReducer(todolistsReducer, [
    //         {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
    //         {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
    //     ])
    //
    // let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
    //     {
    //         [todolistId1]: [
    //             {
    //                 id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistId1,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //             {
    //                 id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistId1,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //             {
    //                 id: v1(), title: 'ReactJS', status: TaskStatuses.New, todoListId: todolistId1,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //             {
    //                 id: v1(), title: 'Rest API', status: TaskStatuses.New, todoListId: todolistId1,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //             {
    //                 id: v1(), title: 'GraphQL', status: TaskStatuses.New, todoListId: todolistId1,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //         ],
    //         [todolistId2]: [
    //             {
    //                 id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todolistId2,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //             {
    //                 id: v1(), title: 'Bread', status: TaskStatuses.Completed, todoListId: todolistId2,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //             {
    //                 id: v1(), title: 'Cookies', status: TaskStatuses.New, todoListId: todolistId2,
    //                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
    //                 description: ''
    //             },
    //         ],
    //     })
    //
    //
    // const removeTask = (id: string, tlId: string) => {
    //     const action = removeTaskAC(id, tlId)
    //     dispatchToTasksReducer(action)
    // }
    //
    // const changeTaskStatus = (t: TaskType, status: TaskStatuses, tlId: string) => {
    //     const action = updateTaskAC(tlId, t.id, {status})
    //     dispatchToTasksReducer(action)
    // }
    //
    // const addTask = (newTaskTitle: string, tlId: string) => {
    //     const action = addTaskAC({
    //         description: '',
    //         title: newTaskTitle,
    //         status: TaskStatuses.New,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         deadline: '',
    //         todoListId: tlId,
    //         order: 0,
    //         addedDate: '',
    //         id: v1()
    //     })
    //     dispatchToTasksReducer(action)
    // }
    //
    // const changeTaskTitle = (title: string, t: TaskType, tlId: string) => {
    //     const action = updateTaskAC(tlId, t.id, {title})
    //     dispatchToTasksReducer(action)
    // }
    //
    //
    // const addTodolist = (newTlTitle: string) => {
    //     const action = addTodolistAC({
    //         id: v1(),
    //         title: newTlTitle,
    //         addedDate: '',
    //         order: 0
    //     })
    //     dispatchToTodolistsReducer(action)
    //     dispatchToTasksReducer(action)
    // }
    //
    // const changeFilter = (newFilter: FilterValuesType, tlId: string) => {
    //     const action = changeTodolistFilterAC(tlId, newFilter)
    //     dispatchToTodolistsReducer(action)
    // }
    //
    // const removeTodolist = (tlId: string) => {
    //     const action = removeTodolistAC(tlId)
    //     dispatchToTodolistsReducer(action)
    //     dispatchToTasksReducer(action)
    // }
    //
    // const changeTodolistTitle = (newTitle: string, tlId: string) => {
    //     const action = changeTodolistTitleAC(tlId, newTitle)
    //     dispatchToTodolistsReducer(action)
    // }

    return (
        <div className="App">
            {/*<Box sx={{flexGrow: 1}}>*/}
            {/*    <AppBar position="static">*/}
            {/*        <Toolbar>*/}
            {/*            <IconButton*/}
            {/*                size="large"*/}
            {/*                edge="start"*/}
            {/*                color="inherit"*/}
            {/*                aria-label="menu"*/}
            {/*                sx={{mr: 2}}*/}
            {/*            >*/}
            {/*                <Menu open={false}/>*/}
            {/*            </IconButton>*/}
            {/*            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>*/}
            {/*                News*/}
            {/*            </Typography>*/}
            {/*            <Button color="inherit">Login</Button>*/}
            {/*        </Toolbar>*/}
            {/*    </AppBar>*/}
            {/*</Box>*/}
            {/*<Container fixed>*/}
            {/*    <Grid container>*/}
            {/*        <AddItemForm addItem={addTodolist}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container spacing={3} style={{padding: '20px'}}>*/}
            {/*        {*/}
            {/*            todolists.map(tl => {*/}
            {/*                let tasksForTodolist = tasksObj[tl.id]*/}

            {/*                if (tl.filter === 'active') {*/}
            {/*                    tasksForTodolist = tasksForTodolist.filter(t =>*/}
            {/*                        t.status === TaskStatuses.New)*/}
            {/*                }*/}

            {/*                if (tl.filter === 'completed') {*/}
            {/*                    tasksForTodolist = tasksForTodolist.filter(t =>*/}
            {/*                        t.status === TaskStatuses.Completed)*/}
            {/*                }*/}

            {/*                return <Grid item>*/}
            {/*                    <Paper style={{padding: '10px'}}>*/}
            {/*                        <Todolist key={tl.id}*/}
            {/*                                  tasks={tasksForTodolist}*/}
            {/*                                  addTask={addTask}*/}
            {/*                                  changeTodolistTitle={changeTodolistTitle}*/}
            {/*                                  removeTask={removeTask}*/}
            {/*                                  changeFilter={changeFilter}*/}
            {/*                                  changeTaskStatus={changeTaskStatus}*/}
            {/*                                  removeTodolist={removeTodolist}*/}
            {/*                                  changeTaskTitle={changeTaskTitle}*/}
            {/*                                  todolist={tl}/>*/}
            {/*                    </Paper>*/}
            {/*                </Grid>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </Grid>*/}
            {/*</Container>*/}
        </div>
    );
}

export default App;
