import React from 'react'
import AppRouter from './router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store/index'
import { ThemeProvider } from '@mui/system'
import theme from 'theme'

const store = setupStore()

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default App
