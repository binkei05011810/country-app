import { useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Fab from '@material-ui/core/Fab';

import { ThemeContext } from '../../App';
import { darkTheme, lightTheme } from '../../themes';

const useStyles = makeStyles({
    root: {
        marginRight: "1rem"
    }
})

function ChooseTheme() {
    const classes = useStyles();
    const { currentTheme, switchTheme } = useContext(ThemeContext);


    const changeTheme = useCallback(
        () => {
            const newTheme = currentTheme.name === "dark" ? lightTheme : darkTheme;
            localStorage.setItem("theme", JSON.stringify(newTheme));
            switchTheme(newTheme);
        },
        [currentTheme.name, switchTheme],
    );

    return (
        <div className={classes.root}>
            <Fab
                onClick={changeTheme}
                size="small"
                aria-label="like">
                {currentTheme.name === "dark"
                    ? <Brightness4Icon />
                    : <Brightness7Icon />}
            </Fab>
        </div>
    )
}

export default ChooseTheme;