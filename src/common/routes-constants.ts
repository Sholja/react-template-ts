import Dashboard from 'app/dashboard/components/dashboard';
import { IRoute } from 'common/types';

export interface IRoutes {
    [key: string]: IRoute;
}

const prefixes = {
    dashboard: 'DASHBOARD',
};

// possible routes inside the app
const routes: IRoutes = {
    home: {
        path: '/',
        prefix: prefixes.dashboard,
        component: Dashboard,
    },
};

export default {
    routes,
    prefixes,
};
