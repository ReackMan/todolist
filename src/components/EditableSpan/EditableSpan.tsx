import React, { FC } from 'react'
import { useEditableSpan } from './hooks/useEditableSpan'

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
    let { editMode, title, activateEditMode, deactivateEditMode, onChangeHandler } = useEditableSpan(
        props.title,
        props.onChange,
    )

    return editMode ? (
        <input value={title} onBlur={deactivateEditMode} onChange={onChangeHandler} autoFocus />
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})
