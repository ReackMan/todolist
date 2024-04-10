import { Login } from './Login'
import { asyncActions, slice } from './auth-reducer'

const authActions = {
    ...asyncActions,
    ...slice.actions,
}

const authReducer = slice.reducer

export type AuthActionsType = ReturnType<typeof authActions.setIsLoggedIn>

export { Login, authActions, authReducer }
