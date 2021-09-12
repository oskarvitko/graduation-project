import { AuthPage } from "../pages/AuthPage"
import { HomePage } from "../pages/HomePage"

const routes = {
    '/': () => <HomePage />,
    '/auth': () => <AuthPage />,
}

export default routes