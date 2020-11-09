/**
 * Primer componente dentro de la app.
 * Usado para configurar todos los providers:
 * - Redux store.
 * - Styled components theme
 * - React router
 * - Configura el <HEAD> usando react-helmet.
 * - Agrega Toast container para mensajes en toast en toda la app.
 */
import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import store from "./redux/store";
import theme from "./shared/theme";
import Router from "./Router";

import "react-toastify/dist/ReactToastify.css";
import { AUTH_TOKEN } from "./shared/constants";

// Todos los API requests envian el auth token para recibir Author en el response
axios.defaults.headers.get["x-token"] = AUTH_TOKEN;

export default () => {
  return (
    <Provider store={store}>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ML test site" />
        <title>Melcha</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        pauseOnHover
      />
    </Provider>
  );
};
