import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    loadingContainer: {
        textAlign: "center",
        width: "100%",
    },

    loading: {
        marginTop: "5rem",
        color: "#4cc9f0"
    }
})

function LoadingIcon() {
    const classes = useStyles();

    return (
        <div className={classes.loadingContainer}>
            <CircularProgress disableShrink className={classes.loading} />
        </div>
    )
}

export default LoadingIcon;