import React from 'react'
import { action } from '@storybook/addon-actions'
import { Task } from './Task'
import { ReduxStoreProviderDecorator } from '../../../../stories/decorators/ReduxStoreProviderDecorator'
import { TaskPriorities, TaskStatuses, TaskType } from '../../../../api/types'

type TaskPropsType = {
    changeTaskStatus: (t: TaskType, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (value: string, t: TaskType, tlId: string) => void
    removeTask: (id: string, tlId: string) => void
    task: TaskType
    tlId: string
}

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
}

const changeTaskStatusCallback = action('Status was changed')
const changeTaskTitleCallback = action('Title was changed')
const removeTaskCallback = action('Task was removed')

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task
                task={{
                    id: '1',
                    status: TaskStatuses.Completed,
                    title: 'CSS',
                    todoListId: 'todolistId1',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: '',
                }}
                tlId={'todolistId1'}
            />
            <Task
                task={{
                    id: '2',
                    status: TaskStatuses.New,
                    title: 'JS',
                    todoListId: 'todolistId2',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: '',
                }}
                tlId={'todolistId2'}
            />
        </>
    )
}
