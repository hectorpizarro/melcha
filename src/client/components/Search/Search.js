/**
 * Search visible en la parte superior de todas las paginas
 */
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setSearchTerm, submitSearch } from "../../redux/rootReducer";
import Styled from "./Search.style";
import ImgLogo from "./images/Logo_ML@2x.png.png.png";
import ImgSearch from "./images/ic_Search@2x.png.png.png";
import { INPUT_MAX_LEN } from "../../shared/constants";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Obtenemos el searchTerm actual desde Redux usando ES6 destructuring
  const {
    root: { searchTerm },
  } = useSelector((state) => state);

  /**
   * Se ejecuta cuando una de estas acciones se ejecuta:
   * - Form hace submit.
   * - Usuario ingresa ENTER en el input.
   * - Click en el boton de search.
   *
   * Y realiza estas acciones:
   * - Detiene reload de pagina cancelando default, propagacion del evento.
   * - Envia async call a funcion para enviar API request.
   * - Actualiza url.
   * @param {Object} event - Objeto event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(submitSearch());
    history.push(`/items?search=${searchTerm}`);
  };

  /**
   * Ejecuta onSubmit cuando el usuario presiona ENTER dentro del input.
   * @param {Object} event - Objeto event
   */
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  /**
   * Ejecutado cuando el input content cambia, actualiza el value a mostrar dentro del input.
   * @param {Object} event - Objeto event
   */
  const onChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm({ searchTerm: newSearchTerm }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Styled.Container>
        <Styled.Grid>
          <div className="logo">
            <Styled.ImgLogo src={ImgLogo} alt="Mercado Libre" />
          </div>
          <div className="search">
            <Styled.Input
              maxLength={INPUT_MAX_LEN}
              onChange={onChange}
              onKeyPress={onKeyPress}
              placeholder="Nunca dejes de buscar"
              value={searchTerm}
            />
            <Styled.Button onClick={onSubmit}>
              <Styled.ImgSearch src={ImgSearch} alt="Buscar" />
            </Styled.Button>
          </div>
        </Styled.Grid>
      </Styled.Container>
    </form>
  );
};
