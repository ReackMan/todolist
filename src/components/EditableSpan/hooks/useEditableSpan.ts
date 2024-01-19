import {ChangeEvent, useState} from "react";

export const useEditableSpan = (newTitle: string,
                                onChange: (value: string) => void) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setTitle(newTitle)
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return { editMode, title, activateEditMode, deactivateEditMode, onChangeHandler }
}