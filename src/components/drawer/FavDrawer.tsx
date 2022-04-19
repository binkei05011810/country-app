import React, { useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';

import { toggleSidebar } from '../../redux/actions';
import FavCountry from './FavCountry';
import { ThemeContext } from '../../App';
import { Theme } from '../../types/types';
import { Store } from '../../redux/store';

const useStyles = makeStyles({
    paper: {
        backgroundColor: (theme: Theme) => theme.palette.background,
        minWidth: "300px",
        color: (theme: Theme) => theme.palette.text
    },

    noFav: {
        marginLeft: "1rem",
        fontFamily: "Raleway, sans-serif"
    }
});

export default function FavDrawer() {
    const { currentTheme } = useContext(ThemeContext);
    const classes = useStyles(currentTheme);
    const dispatch = useDispatch();
    const isOpened = useSelector((store: Store) => store.toggleReducer.open)
    const favCountries = useSelector((store: Store) => store.countryReducer.favCountries)


    const close = useCallback(
        () => {
            dispatch(toggleSidebar());
        },
        [dispatch],
    )

    return (
        <div>
            <React.Fragment>
                <Drawer
                    classes={{ paper: classes.paper }}
                    anchor="right"
                    open={isOpened}
                    onClose={close}>
                    <List>
                        {favCountries.length > 0
                            ? favCountries.map(fav => {
                                return <FavCountry key={fav.name} country={fav} />
                            })
                            : <span className={classes.noFav}>No favorite countries yet</span>}
                    </List>
                </Drawer>

            </React.Fragment>

        </div>
    );
}