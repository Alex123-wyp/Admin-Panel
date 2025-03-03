import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home/home'
import User from '../pages/user/user'
import Mall from '../pages/mall/mall'
import Other from '../pages/other/other'
import PageOne from '../pages/other/pageOne/pageOne'
import PageTwo from '../pages/other/pageTwo/pageTwo'
import login from '../pages/login/login'
import Login from '../pages/login/login'
import { Component } from 'react'



const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: '/',
                element: <Navigate to="home" replace />
            },
            {
                path: 'home',
                Component: Home
            },
            {
                path: 'user',
                Component: User
            },
            {
                path: 'mall',
                Component: Mall
            },
            {
                path: 'other',
                Component: Other,
                children: [
                    {
                        path: 'pageone',
                        Component: PageOne
                    },
                    {
                        path: 'pagetwo',
                        Component: PageTwo
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    },
]

export default createBrowserRouter(routes); 