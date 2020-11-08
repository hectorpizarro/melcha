import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  firstLoaded: false,
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
    setFirstLoaded(state, action) {
      state.firstLoaded = true;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = rootSlice;
// Extract and export each action creator by name
export const { setSearchTerm, setList, setFirstLoaded } = actions;
// Export the reducer, either as a default or named export
export default reducer;

// ======

export const handleFirstLoad = (location) => async (dispatch, getState) => {
  const {
    root: { firstLoaded },
  } = getState();

  if (firstLoaded) {
    return;
  }
  const searchParams = new URLSearchParams(location.search);
  if (location.pathname === "/items") {
    const searchTerm = searchParams.get("search");
    if (searchTerm) {
      await dispatch(setSearchTerm({ searchTerm }));
      await dispatch(submitSearch());
    }
  } else if (/^[a-z0-9]+$/i.test(location.pathname)) {
    const id = location.pathname.replace("/items/", "");
    // await dispatch(selectItem(id));
  }
  dispatch(setFirstLoaded());
};

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
