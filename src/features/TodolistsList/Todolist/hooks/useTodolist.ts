import { useCallback, useEffect } from 'react'
import { TodolistPropsType } from '../Todolist'
import { tasksActions, todolistsActions } from '../../index'
import { FilterValuesType } from '../../todolists-reducer'
import { AddItemFormSubmitHelperType } from '../../../../components/AddItemForm/hooks/useAddItemForm'
import { useActions, useAppDispatch } from '../../../../utils/redux-utils'

export const useTodolist = ({ demo, ...props }: TodolistPropsType) => {
    const { fetchTasks } = useActions(tasksActions)
    const { removeTodolist, changeTodolistFilter, changeTodolistTitle } = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        if (!props.tasks.length) {
            fetchTasks(props.todolist.id)
        }
    }, [])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter((t) => !t.status)
    }

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter((t) => t.status)
    }

    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id)
    }

    const onFilterButtonClickHandler = useCallback(
        (filter: FilterValuesType) => changeTodolistFilter({ filter: filter, id: props.todolist.id }),
        [props.todolist.id],
    )

    const addTaskHandler = useCallback(
        async (newTitle: string, helpers: AddItemFormSubmitHelperType) => {
            let thunk = tasksActions.addTask({ title: newTitle, tlId: props.todolist.id })
            const resultAction = await dispatch(thunk)

            if (tasksActions.addTask.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    const errorMessage = resultAction.payload?.errors[0]
                    helpers.setError(errorMessage)
                } else {
                    helpers.setError('Some error occurred')
                }
            } else {
                helpers.setNewTitle('')
            }
        },
        [props.todolist.id],
    )

    const onTlTitleChange = useCallback(
        (value: string) => {
            changeTodolistTitle({ title: value, id: props.todolist.id })
        },
        [props.todolist.id],
    )

    return {
        tasksForTodolist,
        removeTodolistHandler,
        onFilterButtonClickHandler,
        addTaskHandler,
        onTlTitleChange,
    }
}
