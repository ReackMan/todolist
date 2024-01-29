import React from 'react'
import { action } from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan'

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const callback = action('Title changed')

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan title={'New Title'} onChange={callback} />
}
