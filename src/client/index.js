/**
 * Inicio de la SPA app.
 * Configuracion para hacer hotreload en desarrollo
 */
import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Este es el unico CSS cargado, todos los demas estilos usan styled components
import "./index.css";

const HotApp = hot(App);

ReactDOM.render(<HotApp />, document.getElementById("app"));
