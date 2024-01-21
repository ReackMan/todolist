import {combineReducers} from "redux";
import {thunk} from "redux-thunk";
// @ts-ignore
import logger from 'redux-logger'
import {tasksReducer, todolistsReducer} from "../features/TodolistsList";
import {authReducer} from "../features/Auth";
import {configureStore} from "@reduxjs/toolkit";
import {AppStateType} from "../utils/types";
import {appReducer} from "../features/Application";

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

export let rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    // @ts-ignore
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .prepend(thunk).concat(logger)
    // middleware: [thunk, logger]
})

// @ts-ignore
window.store = store;

