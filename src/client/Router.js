import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import List from "./components/List/List";
import Search from "./components/Search/Search";
import ContentDefault from "./components/ContentDefault/ContentDefault";
import ListItem from "./components/ListItem/ListItem";
import { handleFirstLoad } from "./redux/rootReducer";
import Loader from "./components/Loader/Loader";

const StyledAppContainer = styled.div`
  height: 100vh;
`;

export default () => {
  const {
    root: { firstLoaded },
  } = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleFirstLoad(location));
  }, [dispatch, location]);

  if (!firstLoaded) {
    return <Loader />;
  }

  return (
    <StyledAppContainer>
      <Search />
      <Switch>
        <Route path="/items/:id">
          <ListItem />
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
  );
};
