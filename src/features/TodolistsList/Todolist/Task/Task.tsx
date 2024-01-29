import React from 'react'
import tl from '../Todolist.module.css'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { useTask } from './hooks/useTask'

import { TaskStatuses, TaskType } from '../../../../api/types'

export type TaskPropsType = {
    task: TaskType
    tlId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    let { statusChange, onTaskChange, onRemoveTask } = useTask(props)

    return (
        <li key={props.task.id} className={props.task.status ? tl.status : ''} style={{ position: 'relative' }}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={statusChange} />
            <EditableSpan title={props.task.title} onChange={onTaskChange} />
            <IconButton onClick={onRemoveTask} style={{ position: 'absolute', top: '2px', right: '2px' }}>
                <Delete fontSize="small" />
            </IconButton>
        </li>
    )
})
