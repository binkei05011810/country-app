import { GET_COUNTRY_SUCCESS, AllActions, REACT_COUNTRY_SUCCESS } from '../actions';
import { Country } from '../../types/types';

type CountryState = {
    favCountries: Country[];
    allCountries: Country[];
    searchCountries: Country[]
    country?: Country;
    input: string
}

const initialState: CountryState =
{
    favCountries: [],
    allCountries: [],
    searchCountries: [],
    input: ""
};

const countryReducer = (state = initialState, action: AllActions): CountryState => {
    switch (action.type) {
        case REACT_COUNTRY_SUCCESS:
            const newFav = action.payload;
            return { ...state, favCountries: newFav }


        case GET_COUNTRY_SUCCESS:
            const { country, searchCountries } = action.payload;
            if (country.length === 1) {
                return { ...state, country: country[0] };
            } else {
                if (searchCountries) {
                    return { ...state, allCountries: country, searchCountries: searchCountries };
                }
                return { ...state, allCountries: country, searchCountries: country };
            }

        /*case SEARCH_COUNTRY_SUCCESS:
            const { input, countries } = action.payload;
            return { ...state, searchCountries: countries, input: input }*/
        default:
            return state;
    }
}

export default countryReducer;




