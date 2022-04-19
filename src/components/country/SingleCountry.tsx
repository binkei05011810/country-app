import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Theme, Country } from '../../types/types';
import useCountry from '../../custom-hooks/useCountry';
import { ThemeContext } from '../../App';
import BackButton from './BackButton';
import LoadingIcon from '../utilities/LoadingIcon';
import ScrollDownArrow from '../utilities/ScrollDownArrow';

const useStyles = makeStyles({
    root: {
        backgroundColor: (theme: Theme) => theme.palette.background,
        height: "100%",
        overflowX: "hidden",
        padding: "100px"
    },

    paper1: {
        backgroundColor: (theme: Theme) => theme.palette.table,
        padding: "50px",
        height: "100%",
        position: "relative",

        "& h1": {
            textAlign: "center",
            paddingTop: "2rem",
            color: "#f4978e",
            fontFamily: "Londrina Shadow, cursive",
            fontSize: "2.5rem"
        }
    },

    paper2: {
        backgroundColor: (theme: Theme) => theme.palette.table,
        padding: "50px",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    flag: {
        width: "100%",
        borderRadius: "1rem"
    },

    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: (theme: Theme) => theme.palette.table,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300
    },

    listSection: {
        backgroundColor: 'inherit',
    },

    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },

    header: {
        color: "#4cc9f0",
        fontFamily: "Raleway, sans-serif"
    },

    item: {
        color: (theme: Theme) => theme.palette.text,
        fontFamily: "Raleway, sans-serif"
    },
});

type Sections = {
    "Native name": string[];
    "Capital": string[];
    "Other names": string[];
    "Region": string[];
    "Subregion": string[];
    "Population": number[];
    "Timezones": string[];
    "Border": string[];
    "Currencies": string[];
    "Languages": string[];
}

function SingleCountry() {
    const { currentTheme } = useContext(ThemeContext);
    const classes = useStyles(currentTheme);
    const { name } = useParams<{ name: string }>();
    const country: Country | undefined = useCountry(name) as Country | undefined;
    let realCountry: Country | undefined;

    if (country && country.name === name) {
        realCountry = country as Country;
    } else {
        realCountry = undefined;
    }

    console.log(realCountry)

    const {
        flag,
        nativeName,
        capital,
        altSpellings,
        region, subregion,
        population,
        timezones,
        borders,
        currencies,
        languages
    } = (realCountry as Country) || {};

    const sections: Sections =
    {
        "Native name": [nativeName],
        "Capital": [capital],
        "Other names": altSpellings,
        "Region": [region],
        "Subregion": [subregion],
        "Population": [population],
        "Timezones": timezones,
        "Border": borders,
        "Currencies": currencies ? currencies.map(cur => cur.name) : [],
        "Languages": languages ? languages.map(lang => lang.name) : []
    }

    return (
        <div>
            {!country
                ?
                <LoadingIcon />
                :
                <div className={classes.root}>
                    <BackButton />
                    {Object.keys(country).length !== 0 &&
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={5}>
                                <Paper className={classes.paper1}>
                                    <img className={classes.flag} src={flag} alt={`${name}'s flag`} />
                                    <h1>{name}</h1>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Paper className={classes.paper2}>
                                    <List className={classes.list} subheader={<li />}>
                                        {Object.keys(sections).map((section) => (
                                            <li key={`section-${section}`} className={classes.listSection}>
                                                <ul className={classes.ul}>
                                                    <ListSubheader className={classes.header}>{section}</ListSubheader>
                                                    {
                                                        sections[section as keyof Sections] &&
                                                        sections[section as keyof Sections].map((item: string | number, index: number) => (
                                                            <ListItem key={index}>
                                                                <ListItemText>
                                                                    <span className={classes.item}>{item}</span>
                                                                </ListItemText>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        ))}
                                    </List>
                                    <ScrollDownArrow />
                                </Paper>
                            </Grid>
                        </Grid>}
                </div >}
        </div >
    )
}

export default SingleCountry;