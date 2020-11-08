/**
 * Redux slice, contiene el flag del loader global, el search term y el listado de items.
 * Redux toolkit usa Immer para asegurar la inmutabilidad de la data en state.
 */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { selectItem } from "./itemReducer";

const initialState = {
  firstLoaded: false, // flag para mostrar el loader global
  searchTerm: "", // search term usado en Search
  list: null, // listado de items
  loading: true, // flag para listado
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    // Guarda un nuevo state con nuevo search term
    setSearchTerm(state, action) {
      const {
        payload: { searchTerm },
      } = action;
      state.searchTerm = searchTerm;
    },
    // Guarda un nuevo state con nuevo listado
    setList(state, action) {
      const {
        payload: { list },
      } = action;
      state.list = list;
      state.loading = false;
    },
    // Guarda un nuevo state apagando el flag firstLoaded
    setFirstLoaded(state, action) {
      state.firstLoaded = true;
    },
    // Guarda un nuevo state con nuevo loading de listado
    setLoading(state, action) {
      const {
        payload: { loading },
      } = action;
      state.loading = loading;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = rootSlice;
// Extract and export each action creator by name
export const { setSearchTerm, setList, setFirstLoaded, setLoading } = actions;
// Export the reducer, either as a default or named export
export default reducer;

// ======

/**
 * Verifica si la url contiene data para el route actual:
 * - Si en el query string esta definido "search" y el route espera dicho parametro, actualiza searchTerm y ejecuta el search.
 * - Si estamos en el route de detalle y la url contiene id, ejecuta request para item.
 * @param {Object} location - Location object obtenido de React router
 */
export const handleFirstLoad = (location) => async (dispatch, getState) => {
  const {
    root: { firstLoaded },
  } = getState();

  if (firstLoaded) {
    return; // flag asegura que se ejecute solo la primera vez que carga la app
  }
  const searchParams = new URLSearchParams(location.search);
  if (location.pathname === "/items") {
    // Route espera "search" en query string, actualizar y enviar API request
    const searchTerm = searchParams.get("search");
    if (searchTerm || searchTerm === "") {
      await dispatch(setSearchTerm({ searchTerm }));
      await dispatch(submitSearch());
    }
  } else if (/^\/items\/([a-z0-9]+)$/i.test(location.pathname)) {
    // Route espera item id, enviar API request
    const id = location.pathname.replace("/items/", "");
    await dispatch(selectItem(id));
  }
  dispatch(setFirstLoaded());
};

/**
 * Envia API request usando searchTerm almacenado.
 */
export const submitSearch = () => async (dispatch, getState) => {
  const {
    root: { searchTerm },
  } = getState();
  try {
    dispatch(setLoading({ loading: true }));
    const q = searchTerm.trim();
    if (!q) {
      toast.error("Término de búsqueda incorrecto, intente nuevamente.");
      dispatch(setLoading({ loading: false }));
    } else {
      const { data } = await axios.get(`/api/items?q=${q}`);

      if (data.message === "ERROR") {
        toast.error("Hubo un problema en el sistema, intente nuevamente.");
        dispatch(setLoading({ loading: false }));
      } else {
        dispatch(setList({ list: data }));
      }
    }
  } catch (error) {
    toast.error("Hubo un problema cargando listado, intente nuevamente.");
    dispatch(setLoading({ loading: false }));
  }
};
