import { FC, lazy } from "react";

type NavLinkEntry = {
    type: "nav",
    title: string,
    icon?: string,
    uri: string
} | {
    type: "break"
} | {
    type: "label",
    label: string
}

type RouteEntry = {
    uri: string,
    component: React.LazyExoticComponent<FC<any>> | FC<any>,
    title?: string,
    subtitle?: string,
    navLinks?: NavLinkEntry[]
    excludeInHome?: boolean
}

const routes: RouteEntry[] = [
    {
        uri: '/home',
        component: lazy(() => import('./views/Home'))
    },
    {
        uri: '/projects',
        component: lazy(() => import('./views/Projects'))
    },
    {
        uri: '/about',
        component: lazy(() => import('./views/About'))
    },
    {
        uri: '/contact',
        component: lazy(() => import('./views/Contact'))
    }
];

export default routes;