import { asyncActions, slice, AppStatusType as T1 } from './application-reducer'
import { appActions as commonAppActions } from '../CommonActions/App'

const appActions = {
    ...asyncActions,
    ...slice.actions,
}

const appReducer = slice.reducer

export type AppStatusType = T1

export type AppActionsType =
    | ReturnType<typeof commonAppActions.setAppError>
    | ReturnType<typeof commonAppActions.setAppStatus>

export { appActions, appReducer }
