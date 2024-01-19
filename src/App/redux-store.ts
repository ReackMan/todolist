import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {thunk, ThunkDispatch} from "redux-thunk";
// @ts-ignore
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import {TodolistActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

function saveToLocalStorage(state: AppStateType) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistentState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistentState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

let rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

export type AllActionsType = TodolistActionsType | AppActionsType | AuthActionsType


// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// export let store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    // @ts-ignore
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .prepend(thunk).concat(logger)
    // middleware: [thunk, logger]
})

// store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = ThunkDispatch<AppStateType, any, AllActionsType>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

// @ts-ignore
window.store = store;
