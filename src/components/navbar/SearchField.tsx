import { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { Store } from '../../redux/store';
import { LocationState, Country } from '../../types/types';
import { getCountrySuccess } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    search: {
        height: "2rem",
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function SearchField(
    { searchInput, setSearchInput }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>> }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const allCountries = useSelector((store: Store) => store.countryReducer.allCountries);

    const location = useLocation<LocationState>();

    const searchCountry = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            console.log(evt.target.value);
            setSearchInput(evt.target.value);
        },
        [setSearchInput]
    );

    useEffect(() => {
        const query = {
            page: location?.state?.page || 0,
            searchInput
        }
        const searchCountries = allCountries.filter((country: Country) => country.name.slice(0, searchInput.length).toLowerCase() === searchInput.toLowerCase());
        dispatch(getCountrySuccess(allCountries, searchCountries));
        history.push({ pathname: '/', state: query });
        // eslint-disable-next-line
    }, [searchInput]);

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchInput}
                onChange={searchCountry}
            />
        </div>
    )
}

export default SearchField;