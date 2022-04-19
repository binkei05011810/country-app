import { useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { ThemeContext } from '../../App';
import { Theme } from '../../types/types';

type Cell = {
    id: "flag" | "name" | "population" | "region" | "languages";
    numeric: boolean;
    isSortable: boolean;
    label: "Flag" | "Name" | "Population" | "Region" | "Languages";
}
const headCells: Cell[] = [
    { id: 'flag', numeric: false, isSortable: false, label: 'Flag' },
    { id: 'name', numeric: false, isSortable: true, label: 'Name' },
    { id: 'population', numeric: true, isSortable: true, label: 'Population' },
    { id: 'region', numeric: false, isSortable: true, label: 'Region' },
    { id: 'languages', numeric: false, isSortable: false, label: 'Languages' }
];

const useStyles = makeStyles({
    cell: {
        borderBottom: (theme: Theme) => theme.palette.cellBorder,
        color: (theme: Theme) => theme.palette.text,
        fontFamily: "Raleway, sans-serif",
        fontWeight: 600,
        width: "5rem"
    },
    arrow: {
        color: (theme: Theme) => theme.palette.text,
    }
});

type PropsType = {
    order: "desc" | "asc"
    setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>
    orderBy: "name" | "population" | "region"
    setOrderBy: React.Dispatch<React.SetStateAction<"name" | "population" | "region">>
    sort: () => void
};

function CountryTableHead({ order, setOrder, orderBy, setOrderBy, sort }: PropsType) {
    const { currentTheme } = useContext(ThemeContext);
    const classes = useStyles(currentTheme);


    const sortAction = useCallback(
        (id: "name" | "population" | "region") => {
            const action = async () => {
                if (orderBy !== id) {
                    await setOrderBy(id);
                } else {
                    await setOrder(order === "asc" ? "desc" : "asc");
                }
                sort();
            }
            return () => action();
        },
        [orderBy, setOrderBy, setOrder, sort, order]
    );

    return (
        <TableHead>
            <TableRow>
                {headCells.map((cell: Cell) => (
                    <TableCell
                        className={classes.cell}
                        key={cell.id}
                        align="center"
                        sortDirection={orderBy === cell.id ? order : false}>
                        {!cell.isSortable &&
                            <span>{cell.label}</span>}
                        {
                            cell.isSortable &&
                            <TableSortLabel
                                className={classes.arrow}
                                active={orderBy === cell.id}
                                direction={orderBy === cell.id ? order : 'asc'}
                                onClick={sortAction(cell.id as "name" | "population" | "region")}>
                                {cell.label}
                            </TableSortLabel>
                        }
                    </TableCell>
                ))}
                <TableCell className={classes.cell}></TableCell>
            </TableRow>
        </TableHead >
    )
}

export default CountryTableHead;