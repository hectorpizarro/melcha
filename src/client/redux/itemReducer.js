import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedItem: null,
  loading: true,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setLoading(state, action) {
      const {
        payload: { loading },
      } = action;
      state.loading = loading;
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
const { actions, reducer } = itemSlice;
// Extract and export each action creator by name
export const { setLoading, setSelectedItem } = actions;
// Export the reducer, either as a default or named export
export default reducer;

// ======

export const selectItem = (id) => async (dispatch, getState) => {
  const {
    root: { list },
  } = getState();
  if (list) {
    const selectedItem = list.data.items.find((item) => item.id === id);

    console.log("en lista item es ", selectedItem);

    await dispatch(setSelectedItem({ selectedItem }));
    dispatch(setLoading({ loading: false }));
  }
  try {
    const { data } = await axios.get(`/api/item/${id}`);
    console.log("API item data", data);
    await dispatch(setSelectedItem({ selectedItem: data }));
    dispatch(setLoading({ loading: false }));
  } catch (error) {
    console.log("error", error);
  }
};
