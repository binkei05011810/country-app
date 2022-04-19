// Put effect similar to dispatch in thunk => trigger another action to send data to reducer
import { takeEvery, put, select, fork, all } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
// Effects like takeEvery, takeLatest: define when to run the saga (which action type will trigger the saga)
// Saga have to be triggered. thunk can be called straight away

import {
    getCountrySuccess,
    GET_COUNTRY_SAGA,
    getCountrySaga,
    reactCountrySuccess,
    LIKE_COUNTRY_SAGA,
    UNLIKE_COUNTRY_SAGA,
    likeCountrySaga,
    unlikeCountrySaga,
    /*SEARCH_COUNTRY_SAGA,
    searchCountrySaga,
    searchCountrySuccess*/
} from '../actions';
import { Store } from '../store';
import { Country } from '../../types/types';

function* getCountry(): SagaIterator {
    yield takeEvery(GET_COUNTRY_SAGA, function* (action: ReturnType<typeof getCountrySaga>) {
        const { input, name } = action.payload;
        const url = `https://restcountries.eu/rest/v2/${name ? `name/${name}?fullText=true` : "all"}`;

        //@ts-ignore
        const response = yield fetch(url);
        //@ts-ignore
        const data = yield response.json();

        let searchCountries: Country[] = [];

        if (!name) {
            searchCountries = data.filter(
                (country: Country) => country.name.slice(0, input.length).toLowerCase() === input.toLowerCase()
            )
        }

        yield put(getCountrySuccess(data, searchCountries));
    })
}

// Put effect similar to dispatch in thunk => trigger another action to send data to reducer

const getFavCountries = (store: Store) => store.countryReducer.favCountries;
// Effects like takeEvery, takeLatest: define when to run the saga (which action type will trigger the saga)
// Saga have to be triggered. thunk can be called straight away

function* likeSaga(): SagaIterator {
    yield takeEvery(LIKE_COUNTRY_SAGA, function* (action: ReturnType<typeof likeCountrySaga>) {
        //@ts-ignore
        const favCountries: Country[] = yield select(getFavCountries);
        const country = action.payload;

        const newFav = [...favCountries, country];
        localStorage.setItem("favCountries", JSON.stringify(newFav));

        //@ts-ignore
        yield put(reactCountrySuccess(newFav));
    })
}

function* unlikeSaga(): SagaIterator {
    yield takeEvery(UNLIKE_COUNTRY_SAGA, function* (action: ReturnType<typeof unlikeCountrySaga>) {
        //@ts-ignore
        const favCountries: Country[] = yield select(getFavCountries);
        const countryName = action.payload;

        const remainingFav = favCountries.filter((country: Country) => country.name !== countryName);
        localStorage.setItem("favCountries", JSON.stringify(remainingFav));

        //@ts-ignore
        yield put(reactCountrySuccess(remainingFav));
    })
}

//const getAllCountries = (store: Store) => store.countryReducer.allCountries;

/*function* searchSaga(): SagaIterator {
    yield takeEvery(SEARCH_COUNTRY_SAGA, function* (action: ReturnType<typeof searchCountrySaga>) {
        //@ts-ignore
        const allCountries: Country[] = yield select(getAllCountries);
        const input = action.payload;
        const searchResults = allCountries.filter((country: Country) => country.name.slice(0, input.length).toLowerCase() === input.toLowerCase());
        localStorage.setItem("searchInput", input);

        //@ts-ignore
        yield put(searchCountrySuccess(input, searchResults));
    })
}*/

function* rootSaga() {
    //@ts-ignore
    yield all([fork(getCountry), fork(likeSaga), fork(unlikeSaga)/*, fork(searchSaga)*/])
}

export default rootSaga;
