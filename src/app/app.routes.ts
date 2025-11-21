import { Router, Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Vehicles } from './pages/vehicles/vehicles';
import { Booking } from './pages/booking/booking';
import { Register } from './pages/register/register';
import { inject } from '@angular/core';

export const authGuard = () => {

    const router = inject(Router);
    const loggedIn = localStorage.getItem("isLoggedIn");

    return loggedIn === "true"
        ? true
        : router.parseUrl("/login");
};

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: "register",
        component: Register
    },

    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                canActivate: [authGuard],
            },
            {
                path: 'vehicles',
                component: Vehicles,
                canActivate: [authGuard],
            },
            {
                path: 'booking',
                component: Booking,
                canActivate: [authGuard],
            }
        ]
    }
];
