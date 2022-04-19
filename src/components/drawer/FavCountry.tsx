import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import { useDispatch } from 'react-redux';
import { unlikeCountrySaga } from '../../redux/actions';
import { Country } from '../../types/types';

const useStyles = makeStyles({
    li: {
        marginBottom: "1rem"
    },

    flag: {
        width: "50px",
        height: "35px",
        borderRadius: "0.5rem",
    },

    item: {
        fontFamily: "Raleway, sans-serif",
        marginLeft: "1rem"
    },

    deleteBtn: {
        backgroundColor: "transparent",
        color: "#f48fb1",
        border: "1px solid rgba(244, 143, 177, 0.5)",
    }
})

function FavCountry({ country }: { country: Country }) {
    const classes = useStyles();
    const { flag, name } = country;
    const dispatch = useDispatch();


    const unlike = useCallback(
        () => {
            dispatch(unlikeCountrySaga(name));
        },
        [dispatch, name],
    )

    return (
        <ListItem component="nav" className={classes.li}>
            <ListItemIcon>
                <img src={flag} className={classes.flag} alt={`${name}'s flag`} />
            </ListItemIcon>
            <ListItemText><span className={classes.item}>{name}</span></ListItemText>
            <Fab
                className={classes.deleteBtn}
                onClick={unlike}
                size="small"
                color="secondary"
                aria-label="remove">
                <DeleteForeverRoundedIcon />
            </Fab>
        </ListItem>
    )
}

export default FavCountry;