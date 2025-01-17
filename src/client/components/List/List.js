/**
 * Muestra listado de items cuando usuario hace busqueda.
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getBreadcrumb, getNumLocale } from "../../shared/utils";
import Styled from "./List.style";
import { setLoading, selectItem } from "../../redux/itemReducer";
import Loader from "../shared/Loader/Loader";
import Breadcrumb from "../shared/Breadcrumb/Breadcrumb";
import FreeShipping from "../shared/FreeShipping/FreeShipping";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // Carga list para el render, loading es flag para mostrar loader.
  const {
    root: { list, loading },
  } = useSelector((state) => state);

  if (loading) {
    // flag indica que listado aun no esta procesado, mostrar loader
    return <Loader />;
  }

  /**
   * Activa el flag para mostrar loader, luego ejectua async selectItem para cargar el item, finalmente redirecciona la app al route de item detail.
   * @param {String} id - Item id
   */
  const gotoDetail = async (id) => {
    await dispatch(setLoading({ loading: true }));
    dispatch(selectItem(id));
    history.push(`/items/${id}`);
  };

  // Destructure 'list', si es null configuro defaults para mostrar mensaje indicando no hay items
  const { data: { items = [], categories = [] } = {} } = list || {};

  // total de items en la lista, usado en la logica para manejar estilos
  const len = items.length;

  // Array de categorias a mostrar
  const topCats = getBreadcrumb(categories);

  return (
    <Styled.Container>
      <Breadcrumb>
        <div>
          {/* Si el listado esta vacio mostrar mensaje */}
          {items.length === 0 && (
            <span>No hay resultados en su b&uacute;squeda.</span>
          )}
          {/* Muestra breadcrumb de categorias */}
          {topCats.map((cat, idx) => {
            return (
              <React.Fragment key={cat}>
                {idx > 0 && " > "}
                {idx === topCats.length - 1 ? (
                  <strong>{cat}</strong>
                ) : (
                  <span>{cat}</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Breadcrumb>
      {items.map(({ id, picture, price, free_shipping, title, city }, idx) => (
        <div key={id}>
          <Styled.RowGrid>
            <div
              className={`section contentSection ${idx === 0 ? "first" : ""} ${
                idx === len - 1 ? "last" : ""
              }`}
            >
              <Styled.LeftColumn showTopBorder={idx === 0}>
                <Styled.LinkButton
                  aria-label="Ver item"
                  onClick={() => gotoDetail(id)}
                >
                  <Styled.Image src={picture} alt="" />
                </Styled.LinkButton>
                <Styled.ContentGrid>
                  <div className="currency">{price.currency}</div>
                  <div className="amount">{getNumLocale(price.amount)}</div>
                  <div className="free_shipping">
                    <FreeShipping free_shipping={free_shipping} />
                  </div>
                  <div className="title">
                    <Styled.LinkButton
                      aria-label="Ver item"
                      onClick={() => gotoDetail(id)}
                    >
                      <span>{title}</span>
                    </Styled.LinkButton>
                  </div>
                </Styled.ContentGrid>
              </Styled.LeftColumn>
            </div>
            <div
              className={`section locationSection ${idx === 0 ? "first" : ""} ${
                idx === len - 1 ? "last" : ""
              }`}
            >
              <Styled.RightColumn showTopBorder={idx === 0}>
                {city}
              </Styled.RightColumn>
            </div>
            <div
              className={`section middleSection ${idx === 0 ? "first" : ""} ${
                idx === len - 1 ? "last" : ""
              }`}
            >
              <Styled.MiddleColumn showTopBorder={idx === 0} />
            </div>
          </Styled.RowGrid>
        </div>
      ))}
    </Styled.Container>
  );
};
