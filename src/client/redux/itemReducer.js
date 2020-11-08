/**
 * Redux slice, contiene data relacionada a un item seleccionado.
 * Redux toolkit usa Immer para asegurar la inmutabilidad de la data en state.
 */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  selectedItem: null, // item seleccionado
  loading: true, // flag para mostrar loader mientras se carga data
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    // Guarda un nuevo state con nuevo loading
    setLoading(state, action) {
      const {
        payload: { loading },
      } = action;
      state.loading = loading;
    },
    // Guarda un nuevo state con nuevo selectedItem
    setSelectedItem(state, action) {
      const {
        payload: { selectedItem },
      } = action;
      state.selectedItem = selectedItem;
    },
  },
});

// Extrae actions y reducer del slice
const { actions, reducer } = itemSlice;

// Exporta los actions
export const { setLoading, setSelectedItem } = actions;

// Exporta el reducer para ser usado en store.js
export default reducer;

// ====== Funciones asincronas relacionadas a este slice

/**
 * Primero verifica si hay una lista de items guardada en Redux y el item id esta en dicha lista. Si es asi ejecuta action para guardar el selected item ASAP y actualizar el frontend.
 * Luego envia request a API, ejecuta action y produce nuevo render de frontend actualizando la data de nuevo. De este modo podemos mostrar la misma data que estaba en el listado y luego actualizar por si hubo un cambio en backend.
 * @param {String} id - Item id
 */
export const selectItem = (id) => async (dispatch, getState) => {
  const {
    root: { list },
  } = getState();
  if (list) {
    // si hay lista guardada buscar el item para lograr render mas rapido
    const selectedItem = list.data.items.find((item) => item.id === id);

    if (selectedItem) {
      // item ubicado, guardar y apagar loader
      await dispatch(setSelectedItem({ selectedItem }));
      dispatch(setLoading({ loading: false }));
    }
  }
  try {
    // enviar API request
    const { data } = await axios.get(`/api/item/${id}`);
    if (!data) {
      toast.error("El item seleccionado no existe.");
    } else {
      // Actualizar item seleccionado.
      await dispatch(setSelectedItem({ selectedItem: data }));
    }
    dispatch(setLoading({ loading: false }));
  } catch (error) {
    toast.error("Hubo un problema cargando item, intente nuevamente.");
    dispatch(setLoading({ loading: false }));
  }
};
