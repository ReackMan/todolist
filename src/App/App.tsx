import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./redux-store";
import {UseTodolistsListPropsType} from "../features/TodolistsList/hooks/useTodolistsList";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {setAppIsInitializedTC} from "./app-reducer";
import {logoutTC} from "../features/Login/auth-reducer";
import {useApp} from "./hooks/useApp";


function App({demo = false}: UseTodolistsListPropsType) {

    let {status, isInitialized, isLoggedIn, logoutHandler} = useApp(demo)

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', left: '50%', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
            </Box>
            <ErrorSnackbar/>
            <Container fixed style={{paddingTop: '20px'}}>
                <Routes>
                    <Route path='/' element={<TodolistsList demo={demo}/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
