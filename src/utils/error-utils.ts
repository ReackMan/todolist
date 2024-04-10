import { Dispatch } from 'redux'
import { AxiosError } from 'axios'
import { ResponseType } from '../api/types'
import { appActions } from '../features/CommonActions/App'

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

const { setAppError, setAppStatus } = appActions

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppError({ error: data.messages.length ? data.messages[0] : 'some error occurred' }))
    }
    dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppError({ error: error.message ? error.message : 'some error occurred' }))
    }
    dispatch(setAppStatus({ status: 'failed' }))
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(
            appActions.setAppError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }),
        )
    }
    thunkAPI.dispatch(appActions.setAppStatus({ status: 'failed' }))
    return thunkAPI.rejectWithValue({ errors: data.messages, fieldsErrors: data.fieldsErrors })
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({ error: error.message ? error.message : 'some error occurred' }))
    }
    thunkAPI.dispatch(setAppStatus({ status: 'failed' }))

    return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
}
