import Home from "./pages/Home";
import About from "./pages/About";
import GraphiQL from "./pages/GraphiQL";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'graphiql-route',
        title: 'GraphiQL',
        path: '/graphiql',
        enabled: true,
        component: GraphiQL
    }
]