import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import ContentList from "./components/ContentList";
import ContentItem from "./components/ContentItem";
import Search from "./components/Search";
import theme from "./theme";

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Search />
          <Switch>
            <Route path="/items/:id">
              <ContentItem />
            </Route>
            <Route path="/items">
              <ContentList />
            </Route>
            <Route path="/">
              <div>contenido por default</div>
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};
