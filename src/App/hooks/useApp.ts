import {useAppDispatch, useAppSelector} from "../redux-store";
import {useCallback, useEffect} from "react";
import {setAppIsInitializedTC} from "../app-reducer";
import {logoutTC} from "../../features/Login/auth-reducer";

export const useApp = (demo?: boolean) => {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(setAppIsInitializedTC())
        }
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    } ,[])

    return {status, isInitialized, isLoggedIn, logoutHandler}
};
