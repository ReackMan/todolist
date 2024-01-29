import { createAction } from '@reduxjs/toolkit'
import { AppStatusType } from '../Application/application-reducer'

const setAppStatus = createAction<{ status: AppStatusType }>('appActions/setAppStatus')
const setAppError = createAction<{ error: string | null }>('appActions/setAppError')

export const appActions = {
    setAppStatus,
    setAppError,
}
