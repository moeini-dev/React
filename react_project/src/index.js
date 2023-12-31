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
import { Payment } from './pages/payment/Payment';
import { UserBooks } from './pages/userBooks/UserBooks';
import { Stats } from './pages/stats/Stats';
import { BookContent } from './pages/bookContent/BookContent';



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
    },
    {
        path: 'book/addInitialOrder/',
        element: <Payment />
    },
    {
        path: 'user/:uuid/books',
        element: <UserBooks />
    },
    {
        path: 'stats/',
        element: <Stats />
    },
    {
        path: 'book/content/:isbn',
        element: <BookContent />
    }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    //     {/* <App /> */}
    //     <AuthContextProvider>
    //         <RouterProvider router={router} />
    //     </AuthContextProvider>
    // </React.StrictMode>



    < AuthContextProvider >
        <RouterProvider router={router} />
    </AuthContextProvider >

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
