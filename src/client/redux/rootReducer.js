import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchTerm: "",
  list: null,
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
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = rootSlice;
// Extract and export each action creator by name
export const { setSearchTerm, setList } = actions;
// Export the reducer, either as a default or named export
export default reducer;

// ======

export const submitSearch = () => async (dispatch, getState) => {
  const {
    root: { searchTerm },
  } = getState();
  try {
    const { data } = await axios.get(`/api/items?q=${searchTerm}`);
    console.log("list", data);
    dispatch(setList({ list: data }));
  } catch (error) {
    console.log("error", error);
  }
};
