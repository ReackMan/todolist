import {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../tasks-reducer";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from "../todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../../App/redux-store";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";

export type UseTodolistsListPropsType = {
    demo?: boolean
}

export const useTodolistsList = ({demo = false}: UseTodolistsListPropsType) => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, tlId: string) => {
        dispatch(removeTaskTC({tlId, taskId}))
    }, [dispatch])

    const changeTaskStatus = useCallback((t: TaskType, status: TaskStatuses, tlId: string) => {
        // dispatch(updateTaskTC(tlId, t.id, {status}))
        dispatch(updateTaskTC({tlId, taskId: t.id, model: {status}}))
    }, [dispatch])

    const addTask = useCallback((title: string, tlId: string) => {
        dispatch(addTaskTC({title, tlId}))
    }, [dispatch])

    const changeTaskTitle = useCallback((title: string, t: TaskType, tlId: string) => {
        debugger
        dispatch(updateTaskTC({tlId, taskId: t.id, model: {title}}))
    }, [dispatch])


    const addTodolist = useCallback((newTlTitle: string) => {
        dispatch(addTodolistTC(newTlTitle))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterValuesType, id: string) => {
        const action = changeTodolistFilterAC({id, filter})
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((tlId: string) => {
        dispatch(removeTodolistTC(tlId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodolistTitleTC({title, id}))
    }, [dispatch])

    return {
        todolists, tasks,
        removeTask, changeTaskStatus, changeTaskTitle, addTask,
        removeTodolist, changeTodolistTitle, addTodolist, changeFilter, isLoggedIn
    }

};
