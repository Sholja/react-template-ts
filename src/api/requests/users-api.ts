import { formAxiosObject, AxiosResponse } from 'common/helpers';
import { LOGIN } from 'api/request-objects/users-requests';

// example of API request using axios in the background
export const loginApi = (email: string, password: string): Promise<AxiosResponse<any, any>> | null =>
    formAxiosObject(LOGIN, {
        email,
        password,
    });
