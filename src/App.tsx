import { createContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CountryTable from './components/table/CountryTable';
import FavDrawer from './components/drawer/FavDrawer';
import SingleCountry from './components/country/SingleCountry';

import { darkTheme } from './themes';
import { Theme } from './types/types';

const useStyles = makeStyles({
  app: {
    height: "100%",
    backgroundColor: (theme: Theme) => theme.palette.background
  }
})

type Context = {
  currentTheme: typeof darkTheme
  switchTheme: React.Dispatch<React.SetStateAction<typeof darkTheme>>
};

const defaultContext: Context = {
  currentTheme: darkTheme,
  switchTheme: () => { }
}

export const ThemeContext = createContext(defaultContext);

function App() {
  const localStorageTheme = localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") as string) as (typeof darkTheme)
    : darkTheme;

  const [theme, setTheme] = useState(localStorageTheme || darkTheme);
  const classes = useStyles(theme);
  const context = {
    currentTheme: theme,
    switchTheme: setTheme
  }

  return (
    <ThemeContext.Provider value={context}>
      <div className={classes.app}>
        <Switch>
          <Route exact path="/">
            <CountryTable />
          </Route>

          <Route exact path="/:name">
            <SingleCountry />
          </Route>

        </Switch>
        <FavDrawer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
