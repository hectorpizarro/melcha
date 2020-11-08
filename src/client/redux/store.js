import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import itemReducer from "./itemReducer";

const store = configureStore({
  reducer: {
    root: rootReducer,
    item: itemReducer,
  },
});

export default store;
