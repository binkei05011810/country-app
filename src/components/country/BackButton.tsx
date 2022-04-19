import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    back: {
        position: "absolute",
        top: "20px",
        left: "20px",
    },

    fab: {
        backgroundColor: "#00BCD4",
        color: "black",

        "&:hover": {
            backgroundColor: "#00BCD4",
            opacity: 0.7
        }
    }
})

function BackButton() {
    const classes = useStyles();
    return (
        <Link to="/" className={classes.back}>
            <Fab color="primary" aria-label="add" className={classes.fab}>
                <ArrowBackIcon />
            </Fab>
        </Link>
    )
}

export default BackButton;