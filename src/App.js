import { Provider } from 'react-redux'
import store from './redux'
import AppRouter from './routing/index'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
