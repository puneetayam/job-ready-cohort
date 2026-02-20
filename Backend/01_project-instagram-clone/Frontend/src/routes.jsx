import React from 'react';
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Loading...</h1>
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />
    }
])

export default routes;