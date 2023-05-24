import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoute } from 'common/types';

import routesConstants from 'common/routes-constants';
import _ from 'common/lodash';

const AppRoutes = () => {
    const renderRoutes = (routes: IRoute[]): JSX.Element[] | null => {
        if (routes && routes.length > 0) {
            return routes.map((route: IRoute) => {
                const Component: React.FunctionComponent<any> = route.component;

                return <Route path={route.path} element={<Component {...route} />} key={route.prefix} />;
            });
        }

        return null;
    };

    return (
        <BrowserRouter>
            <Routes>{renderRoutes(_.values(routesConstants.routes))}</Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
