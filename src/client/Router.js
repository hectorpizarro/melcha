/**
 * Define los routes para las 3 paginas:
 * - / muestra search.
 * - /items?search=SEARCHTERM muestra el listado de items.
 * - /item/:id muestra el detalle de un item seleccionado.
 *
 * Cuando la app carga por primera vez se muestra el Loader hasta que handleFirstLoad() defina si debe cargar listado o item data.
 *
 * Cualquier route desconocido redirecciona automaticamente a /.
 */
import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import List from "./components/List/List";
import Search from "./components/Search/Search";
import ContentDefault from "./components/ContentDefault/ContentDefault";
import ListItem from "./components/ListItem/ListItem";
import { handleFirstLoad } from "./redux/rootReducer";
import Loader from "./components/shared/Loader/Loader";

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
      {/* Search siempre visible para todos los routes */}
      <Search />
      <Switch>
        <Route path="/items/:id">
          <ListItem />
        </Route>
        <Route path="/items">
          <List />
        </Route>
        <Route exact path="/">
          {/* Pagina inicial muestra por default component vacio */}
          <ContentDefault />
        </Route>
        {/* Cualquier route desconocido redirecciona a / */}
        <Redirect to="/" />
      </Switch>
    </StyledAppContainer>
  );
};
