import React from 'react'
import { action } from '@storybook/addon-actions'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux-store'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../stories/decorators/ReduxStoreProviderDecorator'

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
}

const callback = action('Title changed')

export const AppBaseExample = (props: any) => {
    return <App/>
}
