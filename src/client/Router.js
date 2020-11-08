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
import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { handleFirstLoad } from "./redux/rootReducer";
import Loader from "./components/shared/Loader/Loader";

const List = React.lazy(() => import("./components/List/List"));
const Search = React.lazy(() => import("./components/Search/Search"));
const ContentDefault = React.lazy(() =>
  import("./components/ContentDefault/ContentDefault")
);
const ListItem = React.lazy(() => import("./components/ListItem/ListItem"));

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
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};
