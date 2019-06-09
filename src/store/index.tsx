import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import reducer from './reducer';

import {
    SearchStateI
} from 'store/reducer';
import {
    ActionT
} from 'store/reducer/actions';

const persistConfig = {
    key: 'search',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(
        thunk as ThunkMiddleware<SearchStateI, ActionT>
    ))
);

export const persistor = persistStore(store);

export default store;
