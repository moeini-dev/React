import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Book } from './pages/book/Book';
import { SearchResults } from './pages/searchResults/SearchResult';

import {
    createBrowserRouter,
    RouterProvider,
    useHistory
} from 'react-router-dom';
import { AddBook } from './pages/addBook/AddBook';
import { UpdateBook } from './pages/updateBook/UpdateBook';
import { AuthContextProvider } from './authContext/AuthContext';



const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/book/:isbn',
        element: <Book />
    },
    {
        path: 'book/addbook',
        element: <AddBook />
    },
    {
        path: 'book/update/:isbn',
        element: <UpdateBook />
    },
    {
        path: '/searchresults',
        element: <SearchResults />
    }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
