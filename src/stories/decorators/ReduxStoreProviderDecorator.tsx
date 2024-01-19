import React from 'react';
import {Provider} from "react-redux";
import {AppStateType, RootReducerType} from "../../App/redux-store";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {appReducer} from "../../App/app-reducer";
import {thunk} from "redux-thunk";
import {HashRouter} from "react-router-dom";
import {authReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";


let rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

let initialGlobalState: AppStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "loading"},
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: ''
            },
        ],
    },
    app: {
        error: null,
        status: "idle",
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType,
//     applyMiddleware(thunk))

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    // @ts-ignore
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .prepend(thunk).concat(logger)
    // middleware: [thunk, logger]
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>
};

export const BrowserRouterDecorator = (storyFn: any) => {
    return <HashRouter> {storyFn()} </HashRouter>
};
