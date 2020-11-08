import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchTerm: "",
  list: null,
  selectedItem: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      const {
        payload: { searchTerm },
      } = action;
      state.searchTerm = searchTerm;
    },
    setList(state, action) {
      const {
        payload: { list },
      } = action;
      state.list = list;
    },
    setSelectedItem(state, action) {
      const {
        payload: { selectedItem },
      } = action;
      state.selectedItem = selectedItem;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = rootSlice;
// Extract and export each action creator by name
export const { setSearchTerm, setList, setSelectedItem } = actions;
// Export the reducer, either as a default or named export
export default reducer;

// ======

export const submitSearch = () => async (dispatch, getState) => {
  const {
    root: { searchTerm },
  } = getState();
  try {
    const { data } = await axios.get(`/api/items?q=${searchTerm}`);
    dispatch(setList({ list: data }));
  } catch (error) {
    console.log("error", error);
  }
};

export const selectItem = (id, history) => (dispatch, getState) => {
  const {
    root: { list },
  } = getState();
  // TODO este es el happy path, agregar error case
  const selectedItem = list.data.items.find((item) => item.id === id);

  dispatch(setSelectedItem({ selectedItem }));
  history.push(`/items/${id}`);
};
