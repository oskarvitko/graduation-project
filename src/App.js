import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { initInterceptors } from './http'
import store from './redux'
import AppRouter from './routing/index'
import theme from './styles/theme'

initInterceptors(store)

function App() {
  return (
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  )
}

export default App
