import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import aif from "./AddItemForm.module.css";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false}) => {

    let {newTitle, error, changeNewTitle, addNewTask, onKeyPressHandler} =
        useAddItemForm(addItem)

    return (
        <div>
            <TextField onChange={changeNewTitle}
                       value={newTitle}
                       label='Type value'
                       onKeyPress={onKeyPressHandler}
                       error={error}
                       helperText={error ? 'Title is required' : ''}
                       disabled={disabled}/>
            <IconButton onClick={addNewTask} disabled={disabled}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
})

