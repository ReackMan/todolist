import React from 'react'
import { action } from '@storybook/addon-actions'
import { AddItemForm } from './AddItemForm'

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

const callback = async () => action('Button "add" was pressed inside the form')

export const AddItemFormBaseExample = (props: any) => {
    // @ts-ignore
    return <AddItemForm addItem={callback} />
}

export const AddItemDisabledFormBaseExample = (props: any) => {
    // @ts-ignore
    return <AddItemForm addItem={callback} disabled={true} />
}
