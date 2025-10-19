import React from 'react'
import './App.css'
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { TodolistsList } from '../features/TodolistsList'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/Auth'
import { useApp } from './hooks/useApp'

function App() {
    let { status, isInitialized, isLoggedIn, logoutHandler } = useApp()

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', left: '50%', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="app">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Todolist
                        </Typography>
                        {isLoggedIn && (
                            <Button color="inherit" onClick={logoutHandler}>
                                Log out
                            </Button>
                        )}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress />}
                </AppBar>
            </Box>
            <ErrorSnackbar />
            <Container fixed style={{ paddingTop: '20px', height: '100%' }}>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={false} />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
