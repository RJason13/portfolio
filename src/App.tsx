import React, { FC, Suspense, useMemo } from 'react';
import DefaultLayout from 'layouts/Default/Default';
import { BrowserRouter, Redirect, Route, Switch as RouteSwitch } from "react-router-dom";
import routes from "./routes";
import Loading from 'components/Loading';
import ErrorLayout from 'layouts/Error';

import { Provider, useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import Viewport from 'components/Viewport';
import { createMuiTheme, CssBaseline, responsiveFontSizes, useMediaQuery } from '@material-ui/core';
import { themeSelector } from 'state/theme';
import { palette } from 'styles/theme';
import store from 'state/store';


const ThemedLayout: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { darkMode: darkModeState } = useSelector(themeSelector);

  const theme = useMemo(() => {
      const darkMode = darkModeState === null ? prefersDarkMode : darkModeState;
      return responsiveFontSizes(
          createMuiTheme({
              palette: palette[darkMode ? 'dark' : 'light']
          })
      );
  }, [prefersDarkMode, darkModeState]);

  return (
      <>
          <Viewport />
          <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {children}
              </ThemeProvider>
          </MuiThemeProvider>
      </>
  );
};

function App() {
  return (
    <Provider store={store}>
        <ThemedLayout>
          <BrowserRouter>
          <DefaultLayout>
              <RouteSwitch>
                <Redirect from="/" to="/home" exact/>
                {routes.map((route, index) => <Route key={index} path={route.uri} exact component={() => {
                  const Component = route.component;
                  return <Suspense fallback={<Loading />} ><Component /></Suspense>;
                }}/>)}
                <Route component={()=><ErrorLayout error={{statusCode: 404}} />}/>
              </RouteSwitch>
            </DefaultLayout>
          </BrowserRouter>
        </ThemedLayout>
    </Provider>
  );
}

export default App;
