import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Fab from '@material-ui/core/Fab';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';

import { likeCountrySaga, unlikeCountrySaga } from '../../redux/actions'
import { Country } from '../../types/types';
import { ThemeContext } from '../../App';
import { Theme } from '../../types/types';
import { Store } from '../../redux/store';

const useStyles = makeStyles({
    cell: {
        minWidth: "7rem",
        maxWidth: "7rem",
        borderBottom: (theme: Theme) => theme.palette.cellBorder,
        color: (theme: Theme) => theme.palette.text,
        fontFamily: "Raleway, sans-serif",
        "& img": {
            width: "100px",
            height: "65px",
            borderRadius: "1rem"
        }
    },

    cellLink: {
        color: "#4cc9f0",
        textDecoration: "none",
        "&:hover": {
            opacity: 0.7
        }
    },

    like: {
        fontSize: "1.5rem",
    },

    liked: {
        width: "2rem",
        color: "pink"
    },

    likeButton: {
        backgroundColor: "transparent",
        color: "#f48fb1",
        border: "1px solid rgba(244, 143, 177, 0.5)",
        borderRadius: "50%"
    }
});

function CountryTableRow({ country }: { country: Country }) {
    const { currentTheme } = useContext(ThemeContext);
    const classes = useStyles(currentTheme);
    const { flag, name, region, population, languages } = country;

    const dispatch = useDispatch();
    const favCountries = useSelector((store: Store) => store.countryReducer.favCountries);

    const handleReact = () => {
        if (favCountries.find((country: Country) => country.name === name)) {
            dispatch(unlikeCountrySaga(country.name));
        } else {
            dispatch(likeCountrySaga(country));
        }

    }

    return (
        <TableRow>
            <TableCell align="center" className={classes.cell}>
                <img
                    src={flag}
                    alt={`${name}'s flag`} />
            </TableCell>
            <TableCell align="center" className={classes.cell}>
                <Link className={classes.cellLink} to={`/${name}`}>{name}</Link>
            </TableCell>
            <TableCell align="center" className={classes.cell}>{population}</TableCell>
            <TableCell align="center" className={classes.cell}>{region}</TableCell>
            <TableCell align="center" className={classes.cell}>{languages.map(lang => lang.name).join(", ")}</TableCell>
            <TableCell align="center" className={classes.cell}>
                <Fab size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.likeButton}
                    onClick={handleReact}>
                    {favCountries.find((country: Country) => country.name === name)
                        ? <FavoriteIcon className={classes.liked} />
                        : <FavoriteBorderIcon className={classes.like} />}
                </Fab>
            </TableCell>
        </TableRow>
    )
}


export default CountryTableRow;