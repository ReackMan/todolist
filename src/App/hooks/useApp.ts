import { useCallback, useEffect } from 'react'
import { authActions } from '../../features/Auth'
import { useActions, useAppSelector } from '../../utils/redux-utils'
import { appActions } from '../../features/Application'

export const useApp = () => {
    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const { logout } = useActions(authActions)
    const { setAppIsInitialized } = useActions(appActions)

    useEffect(() => {
        if (!isInitialized) {
            setAppIsInitialized()
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    return { status, isInitialized, isLoggedIn, logoutHandler }
}
