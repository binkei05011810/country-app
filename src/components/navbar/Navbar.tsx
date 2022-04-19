import { useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';

import { toggleSidebar } from '../../redux/actions'
import SearchField from './SearchField';
import ChooseTheme from './ChooseTheme';
import { ThemeContext } from '../../App';
import { Theme } from '../../types/types';
import { Store } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: (theme: Theme) => theme.palette.navBackground
    },

    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },

    group: {
        display: "flex",
        alignItems: "center"
    },

    title: {
        flexGrow: 1,
        display: 'none',
        fontFamily: "Londrina Shadow, cursive",
        fontSize: "2rem",
        marginRight: "1rem",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    favList: {
        backgroundColor: "#f48fb1"
    }
}));

export default function Navbar(
    { searchInput, setSearchInput }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>> }) {
    const { currentTheme } = useContext(ThemeContext);

    const classes = useStyles(currentTheme);
    const dispatch = useDispatch();
    const favCountries = useSelector((store: Store) => store.countryReducer.favCountries);


    const openFav = useCallback(
        () => {
            dispatch(toggleSidebar());
        },
        [dispatch],
    );

    return (
        <div>
            <AppBar className={classes.nav} position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.group}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Countries
                        </Typography>

                        <SearchField searchInput={searchInput} setSearchInput={setSearchInput} />
                    </div>

                    <div className={classes.group}>
                        <ChooseTheme />

                        <Badge onClick={openFav} badgeContent={favCountries.length} overlap="circle" color="secondary" showZero>
                            <Fab size="small" className={classes.favList} aria-label="favorite countries">
                                <FavoriteIcon />
                            </Fab>
                        </Badge>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}