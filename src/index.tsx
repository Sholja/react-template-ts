import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './core/store';

import App from './App';
import initilizeHttpClient from './core/axios-config';
import './core/i18n';

initilizeHttpClient();

export const { persistor, store } = configureStore();

// hack for issue with typescript and children props.

const AppWrapper = (): React.ReactElement<any> => (
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <App />
        </Provider>
    </PersistGate>
);

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWrapper />);
