import { ChangeEvent, KeyboardEvent, useState } from 'react'

export type AddItemFormSubmitHelperType = { setError: (error: string) => void; setNewTitle: (title: string) => void }

export const useAddItemForm = (addItem: (newTitle: string, helpers: AddItemFormSubmitHelperType) => void) => {
    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState('')

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
        setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && addNewTask()
    }

    const onBlurHandler = () => {
        if (newTitle.trim() === '') {
            setError('')
        }
    }

    const addNewTask = async () => {
        if (newTitle.trim() !== '') {
            addItem(newTitle, { setError, setNewTitle })
        } else {
            setError('Title is required')
        }
    }

    return { newTitle, error, changeNewTitle, addNewTask, onKeyPressHandler, onBlurHandler }
}
