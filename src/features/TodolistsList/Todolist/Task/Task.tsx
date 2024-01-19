import React from "react";
import tl from "../Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useTask} from "./hooks/useTask";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

export type TaskPropsType = {
    changeTaskStatus: (t: TaskType, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (value: string, t: TaskType, tlId: string) => void
    removeTask: (id: string, tlId: string) => void
    task: TaskType
    tlId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    let {statusChange, onTaskChange, onRemoveTask} = useTask(props)

    return <li key={props.task.id} className={props.task.status ? tl.status : ''}>
        <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={statusChange}/>
        <EditableSpan title={props.task.title} onChange={onTaskChange}/>
        <IconButton onClick={onRemoveTask}>
            <Delete/>
        </IconButton>
    </li>
})