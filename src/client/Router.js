import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

import List from "./components/List/List";
import ContentItem from "./components/ContentItem";
import Search from "./components/Search/Search";
import ContentDefault from "./components/ContentDefault/ContentDefault";

const StyledAppContainer = styled.div`
  height: 100vh;
`;

export default () => {
  return (
    <Router>
      <StyledAppContainer>
        <Search />
        <Switch>
          <Route path="/items/:id">
            <ContentItem />
          </Route>
          <Route path="/items">
            <List />
          </Route>
          <Route exact path="/">
            <ContentDefault />
          </Route>
          <Redirect to="/" />
        </Switch>
      </StyledAppContainer>
    </Router>
  );
};
