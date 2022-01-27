import { CssBaseline } from '@mui/material'
import React from 'react'
import AppRouter from './router'
import { BrowserRouter } from 'react-router-dom'
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
