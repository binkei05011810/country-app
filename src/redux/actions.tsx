import { Country } from '../types/types';
import { ActionReturn } from '../types/reduxTypes';

// Variables for tgoogle actions
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

//like and dislike
export const LIKE_COUNTRY_SAGA = "LIKE_COUNTRY_SAGA";
export const UNLIKE_COUNTRY_SAGA = "UNLIKE_COUNTRY_SAGA";
export const REACT_COUNTRY_SUCCESS = "REACT_COUNTRY_SAGA";

//Variables for fetching countries data action
export const GET_COUNTRY_SAGA = "GET_COUNTRY_SAGA";
export const GET_COUNTRY_SUCCESS = "GET_COUNTRY_SUCCESS";

//Variables for searching
export const SEARCH_COUNTRY_SAGA = "SEARCH_COUNTRY_SAGA";
export const SEARCH_COUNTRY_SUCCESS = "SEARCH_COUNTRY_SUCCESS";
//export const SEARCH = "UPDATE_SEARCH";

// Switch the appearance of the sidebar
export const toggleSidebar = ()
    : ActionReturn<typeof TOGGLE_SIDEBAR, null> => {
    return {
        type: TOGGLE_SIDEBAR
    }
}

export const likeCountrySaga = (country: Country)
    : ActionReturn<typeof LIKE_COUNTRY_SAGA, Country> => {
    return {
        type: LIKE_COUNTRY_SAGA,
        payload: country
    }
}

export const unlikeCountrySaga = (countryName: string)
    : ActionReturn<typeof UNLIKE_COUNTRY_SAGA, string> => {
    return {
        type: UNLIKE_COUNTRY_SAGA,
        payload: countryName
    }
}

//Add and remove countries from favorite list
export const reactCountrySuccess = (favList: Country[])
    : ActionReturn<typeof REACT_COUNTRY_SUCCESS, Country[]> => {
    return {
        type: REACT_COUNTRY_SUCCESS,
        payload: favList
    }
}

//Action to trigger the saga
export const getCountrySaga = (input: string, name: string | undefined)
    : ActionReturn<typeof GET_COUNTRY_SAGA, { input: string, name: string | undefined }> => {
    return {
        type: GET_COUNTRY_SAGA,
        payload: { input, name }
    }
}

//Action to delever the data from saga to reducer
export const getCountrySuccess = (country: Country[], searchCountries?: Country[])
    : ActionReturn<typeof GET_COUNTRY_SUCCESS, { country: Country[], searchCountries: Country[] | undefined }> => {
    return {
        type: GET_COUNTRY_SUCCESS,
        payload: { country, searchCountries }
    }
}

export type AllActions = ReturnType<
    typeof toggleSidebar
    | typeof reactCountrySuccess
    | typeof getCountrySuccess>
