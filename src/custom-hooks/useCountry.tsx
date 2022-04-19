// your custom hook goes here
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getCountrySaga } from '../redux/actions';
import { Country, LocationState } from '../types/types';
import { Store } from '../redux/store';

function useCountry(name?: string): Country | Country[] | undefined {
    const dispatch = useDispatch();
    const location = useLocation<LocationState>();
    const input = location?.state?.searchInput || "";

    let allCountries = useSelector((store: Store) => store.countryReducer.searchCountries);
    let country = useSelector((store: Store) => store.countryReducer.country);

    useEffect(() => {
        dispatch(getCountrySaga(input, name));
    }, [dispatch, name, input])

    return name ? country : allCountries;
}

export default useCountry;