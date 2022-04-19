import { Country } from './types/types'

function descendingComparator(a: Country, b: Country, orderBy: "name" | "population" | "region") {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: string, orderBy: "name" | "population" | "region") {
    return order === 'desc'
        ? (a: Country, b: Country) => descendingComparator(a, b, orderBy)
        : (a: Country, b: Country) => - descendingComparator(a, b, orderBy);
}

export default getComparator;