import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppStateType } from './types'

export const useAppDispatch: () => AppDispatch = useDispatch

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
