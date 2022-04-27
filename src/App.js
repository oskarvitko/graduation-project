import React from 'react'
import AppRouter from './router'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
const App = () => {
    return (
        <BrowserRouter>
            <CssBaseline>
                <AppRouter />
            </CssBaseline>
        </BrowserRouter>
    )
}

export default App
