import React, { FC } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { AddItemFormSubmitHelperType, useAddItemForm } from './hooks/useAddItemForm'

type AddItemFormPropsType = {
    addItem: (newTitle: string, helpers: AddItemFormSubmitHelperType) => Promise<void>
    disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({ addItem, disabled = false }) => {
    let { newTitle, error, changeNewTitle, addNewTask, onKeyPressHandler, onBlurHandler } = useAddItemForm(addItem)

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <TextField
                onChange={changeNewTitle}
                value={newTitle}
                label="Type value"
                onKeyPress={onKeyPressHandler}
                onBlur={onBlurHandler}
                error={!!error.length}
                helperText={error}
                disabled={disabled}
            />
            <IconButton onClick={addNewTask} disabled={disabled}>
                <AddCircle color="primary" />
            </IconButton>
        </div>
    )
})
