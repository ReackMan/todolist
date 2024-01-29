import { ChangeEvent, useCallback } from 'react'
import { TaskPropsType } from '../Task'
import { tasksActions } from '../../../index'
import { useActions } from '../../../../../utils/redux-utils'
import { TaskStatuses } from '../../../../../api/types'

export const useTask = (props: TaskPropsType) => {
    const { updateTask, removeTask } = useActions(tasksActions)

    const statusChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            updateTask({
                tlId: props.tlId,
                taskId: props.task.id,
                model: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
            })
        },
        [props.task, props.tlId],
    )

    const onTaskChange = useCallback(
        (value: string) => {
            updateTask({ tlId: props.tlId, taskId: props.task.id, model: { title: value } })
        },
        [props.task, props.tlId],
    )

    const onRemoveTask = useCallback(
        () => removeTask({ taskId: props.task.id, tlId: props.tlId }),
        [removeTask, props.task.id, props.tlId],
    )

    return { statusChange, onTaskChange, onRemoveTask }
}
