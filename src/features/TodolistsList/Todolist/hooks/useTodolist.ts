import {useCallback, useEffect} from "react";
import {TodolistPropsType} from "../Todolist";
import {fetchTasksTC} from "../../tasks-reducer";
import {useAppDispatch} from "../../../../App/redux-store";

export const useTodolist = ({demo, ...props}: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, []);


    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.status)
    }

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id),
        [props.changeFilter, props.todolist.id])

    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id),
        [props.changeFilter, props.todolist.id])

    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id),
        [props.changeFilter, props.todolist.id])

    const addTask = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const onTlTitleChange = useCallback((value: string) => {
        props.changeTodolistTitle(value, props.todolist.id)
    }, [props.changeTodolistTitle, props.todolist.id])

    return {
        tasksForTodolist, removeTodolist, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler,
        addTask, onTlTitleChange
    }
}