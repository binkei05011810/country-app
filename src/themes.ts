import { Theme } from './types/types';

export const darkTheme: Theme = {
    name: "dark",
    palette: {
        background: "#333",
        table: "#424242",
        text: "#fff",
        cellBorder: "1px solid rgba(81, 81, 81, 1)",
        navBackground: "#121212"
    }
}

export const lightTheme: Theme = {
    name: "light",
    palette: {
        background: "#f5f5f5",
        table: "#fff",
        text: "rgba(0, 0, 0, 0.87)",
        navBackground: "#5390d9",
        cellBorder: "1px solid rgba(224, 224, 224, 1)"
    }
}

