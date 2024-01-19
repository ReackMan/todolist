import React from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {useTodolist} from "./hooks/useTodolist";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";


export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    demo?: boolean
    removeTodolist: (tlId: string) => void
    removeTask: (taskId: string, tlId: string) => void
    changeFilter: (value: FilterValuesType, tlId: string) => void
    addTask: (newTitle: string, tlId: string) => void
    changeTaskStatus: (t: TaskType, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (value: string, t: TaskType, tlId: string) => void
    changeTodolistTitle: (value: string, tlId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    let {tasksForTodolist, removeTodolist, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler,
        addTask, onTlTitleChange} = useTodolist(props)

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={onTlTitleChange}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map(t => <Task key={t.id}
                                               changeTaskStatus={props.changeTaskStatus}
                                               task={t}
                                               tlId={props.todolist.id}
                                               removeTask={props.removeTask}
                                               changeTaskTitle={props.changeTaskTitle}/>)
                }
            </ul>
            <div>
                <Button color={'error'} variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={'secondary'} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={'success'} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
})

