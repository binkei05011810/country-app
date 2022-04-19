import { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import { Country, Theme, LocationState } from '../../types/types';
import useCountry from '../../custom-hooks/useCountry';
import CountryTableRow from './CountryTableRow';
import CountryTableHead from './CountryTableHead';
import getComparator from '../../helperFunctions';
import { useDispatch } from 'react-redux';
import { getCountrySuccess } from '../../redux/actions';
import Navbar from '../../components/navbar/Navbar';

//Theme related
import { ThemeContext } from '../../App';

const useStyles = makeStyles({
    content: {
        backgroundColor: (theme: Theme) => theme.palette.background,
        padding: "50px 100px",
    },
    container: {
        borderRadius: "1rem",
        override: "hidden",
        backgroundColor: (theme: Theme) => theme.palette.table,
    },

    table: {
        minWidth: 650,
        backgroundColor: (theme: Theme) => theme.palette.table,
    },

    pagination: {
        color: (theme: Theme) => theme.palette.text,
    },

    loadingContainer: {
        textAlign: "center",
        width: "100%",
    },

    loading: {
        marginTop: "5rem",
        color: "#4cc9f0"
    }
});

const rowsPerPage = 10;

function CountryTable() {
    //Set the theme
    const { currentTheme } = useContext(ThemeContext);
    const classes = useStyles(currentTheme);
    /*==================================================*/

    //All the states
    const location = useLocation<LocationState>();
    const [page, setPage] = useState(location?.state?.page || 0);
    //Ascending or Descending
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    //Order by name, population or region
    const [orderBy, setOrderBy] = useState<"name" | "population" | "region">("name");
    //Search input state
    const [searchInput, setSearchInput] = useState<string>(location?.state?.searchInput || "");
    /*==================================================*/

    const displayCountries = useCountry() as Country[];
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChangePage = useCallback(
        (event: unknown, newPage: number) => {
            setPage(newPage);
        }, []
    )

    useEffect(() => {
        //Create query, icluding info abt page and search input to put in the url
        const query = {
            page,
            searchInput
        }
        history.push({ pathname: '/', state: query });
    }, [history, page, searchInput]);

    const sort = useCallback(
        () => {
            const sortedCountries = [...displayCountries].sort(getComparator(order, orderBy));
            console.log(sortedCountries);
            dispatch(getCountrySuccess(sortedCountries));
        },
        [displayCountries, order, orderBy, dispatch],
    );

    return (
        <div>
            <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />
            {displayCountries.length === 0
                ? <div className={classes.loadingContainer}><CircularProgress disableShrink className={classes.loading} /></div>
                : <div className={classes.content}>
                    <TableContainer className={classes.container} component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table">

                            <CountryTableHead
                                orderBy={orderBy}
                                setOrderBy={setOrderBy}
                                order={order}
                                setOrder={setOrder}
                                sort={sort} />

                            <TableBody>
                                {displayCountries
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((country: Country) => (
                                        <CountryTableRow key={country.name} country={country} />
                                    ))}
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <TablePagination
                        className={classes.pagination}
                        component="div"
                        count={displayCountries.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            }
        </div>
    )
}


export default CountryTable;