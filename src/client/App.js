import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import store from "./redux/store";
import theme from "./theme";
import Router from "./Router";

export default () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};
