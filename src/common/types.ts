import React from 'react';

export interface IRequestObject {
    method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH';
    route: string;
}

export interface IRoute {
    path: string;
    prefix: string;
    component: React.FunctionComponent<any>;
}
