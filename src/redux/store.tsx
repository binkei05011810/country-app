import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import countryReducer from './reducers/countryReducer';
import toggleReducer from './reducers/toggleReducer';
import rootSaga from './saga/sagas';

const rootReducer = combineReducers({ countryReducer, toggleReducer });

export type Store = ReturnType<typeof rootReducer>;

const initialState: Store = {
    countryReducer: {
        favCountries: localStorage.getItem("favCountries")
            ? JSON.parse(localStorage.getItem("favCountries") as string)
            : [],
        allCountries: [],
        searchCountries: [],
        input: localStorage.getItem("searchInput") || ""
    },
    toggleReducer: {
        open: false
    },
}

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    let composeEnhancers = compose;

    if (process.env.NODE_ENV === 'development') {
        if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                trace: true
            })
        }
    }
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

export default makeStore;