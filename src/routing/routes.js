import { BookmarksPage } from "../pages/BookmarksPage"
import { HomePage } from "../pages/HomePage"
import Material from "../pages/Material/Material"
import { MaterialsPage } from "../pages/MaterialsPage"
import User from "../pages/User/User"

const routes = {
    '/home': () => <HomePage />,
    '/materials': () => <MaterialsPage />,
    '/bookmarks': () => <BookmarksPage />,
    '/material/:id': () => <Material />,
    '/user': () => <User />,
}

export default routes