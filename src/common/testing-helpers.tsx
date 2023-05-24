import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import { MemoryRouter } from 'react-router-dom';

import 'core/i18n';

const encryptor = encryptTransform({
    secretKey: 'secret-key',
});

const config = {
    key: 'root',
    // only these will be saved in persist state
    whitelist: [],
    // these will not be persisted
    blacklist: [],
    storage,
    transforms: [encryptor],
};

const reducer = persistCombineReducers(config, {});

const mockStore = createStore(reducer);

const wrapComponent = (Component: React.FunctionComponent<any>, props: object = {}): React.ReactElement<any> => (
    <MemoryRouter>
        <Provider store={mockStore}>
            <Component {...props} />
        </Provider>
    </MemoryRouter>
);

export default wrapComponent;
