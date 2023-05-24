import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import _ from 'common/lodash';
import { IRequestObject } from 'common/types';

export type { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders };

export const blockPageScroll = (): void => {
    if (document.body.className.indexOf('loader-block-scroll') === -1) {
        document.body.className += ' loader-block-scroll';
    }
};

export const unblockPageScroll = (): void => {
    document.body.className = document.body.className.split('loader-block-scroll').join('');
};

export const formAxiosObject = (requestObject: IRequestObject, data?: object, params?: object, urlParams?: object, headers?: AxiosRequestHeaders): Promise<AxiosResponse<any, any>> | null => {
    if (!requestObject || !requestObject.route || !requestObject.method) {
        return null;
    }

    let { route } = requestObject;

    if (urlParams && !_.isObjectEmpty(urlParams)) {
        Object.keys(urlParams).forEach((key) => {
            route += `/${urlParams[key as keyof typeof urlParams]}`;
        });
    }

    const axiosObject: AxiosRequestConfig = {
        url: route,
        method: requestObject.method,
    };

    const { method } = axiosObject;

    if (data && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
        axiosObject.data = data;
    }

    if (params && requestObject.method === 'GET') {
        axiosObject.params = params;
    }

    if (headers) {
        axiosObject.headers = headers;
    }

    return axios(axiosObject);
};
