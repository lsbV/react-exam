import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import BookAdd from "./components/BookAdd/BookAdd.tsx";
import BookPage from "./components/BookPage/BookPage.tsx";
import EditBook from "./components/EditBook/EditBook.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: "books/add",
        element: <BookAdd/>
    },
    {
        path: "books/:id",
        element: <BookPage/>
    },
    {
        path: "books/:id/edit",
        element: <EditBook/>
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    }
])

export default router;