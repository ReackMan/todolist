import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (addItem: (newTitle: string) => void) => {

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState(false)

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask()
        }
    }

    const addNewTask = () => {
        if (newTitle.trim() === '') {
            setNewTitle('')
            setError(true)
        } else {
            addItem(newTitle)
            setNewTitle('')
            setError(false)
        }
    }

    return { newTitle, error, changeNewTitle, addNewTask, onKeyPressHandler }
}