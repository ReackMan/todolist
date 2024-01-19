import {ChangeEvent, useCallback} from "react";
import {TaskPropsType} from "../Task";
import {TaskStatuses} from "../../../../../api/todolists-api";

export const useTask = (props: TaskPropsType) => {

    const statusChange = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task, e.currentTarget.checked ? TaskStatuses.Completed
            : TaskStatuses.New, props.tlId)
    }, [props.changeTaskStatus, props.task, props.tlId])

    const onTaskChange = useCallback( (value: string) => {
        debugger
        props.changeTaskTitle(value, props.task, props.tlId)
    }, [props.changeTaskTitle, props.task, props.tlId])

    const onRemoveTask = useCallback (() => props.removeTask(props.task.id, props.tlId),
        [props.removeTask, props.task.id, props.tlId])

    return { statusChange, onTaskChange, onRemoveTask }
}