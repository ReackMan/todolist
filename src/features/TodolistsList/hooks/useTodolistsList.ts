import { useCallback, useEffect } from 'react'
import { todolistsActions } from '../index'
import { AddItemFormSubmitHelperType } from '../../../components/AddItemForm/hooks/useAddItemForm'
import { useActions, useAppDispatch, useAppSelector } from '../../../utils/redux-utils'

export type UseTodolistsListPropsType = {
    demo?: boolean
}

export const useTodolistsList = ({ demo = false }: UseTodolistsListPropsType) => {
    const todolists = useAppSelector((state) => state.todolists)
    const tasks = useAppSelector((state) => state.tasks)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const { fetchTodolists } = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todolists.length) {
            fetchTodolists()
        }
    }, [])

    const addTodolistCallback = useCallback(async (newTitle: string, helpers: AddItemFormSubmitHelperType) => {
        let thunk = todolistsActions.addTodolist(newTitle)
        const resultAction = await dispatch(thunk)

        if (todolistsActions.addTodolist.rejected.match(resultAction)) {
            if (resultAction.payload?.errors.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helpers.setError(errorMessage)
            } else {
                helpers.setError('Some error occurred')
            }
        } else {
            helpers.setNewTitle('')
        }
    }, [])

    return {
        todolists,
        tasks,
        addTodolistCallback,
        isLoggedIn,
    }
}
