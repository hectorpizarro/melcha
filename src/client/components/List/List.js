/**
 * Muestra listado de items cuando usuario hace busqueda.
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getBreadcrumb, getNumLocale } from "../../shared/utils";
import Styled from "./List.style";
import ImgFreeShipping from "./images/ic_shipping@2x.png.png.png";
import { setLoading, selectItem } from "../../redux/itemReducer";
import Loader from "../Loader/Loader";

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

  // total de items en la lista, usado en la logica para manejar estilos
  const len = list.data.items.length;

  // Array de categorias a mostrar
  const topCats = getBreadcrumb(list.data.categories);

  return (
    <div>
      <Styled.Breadcrumb>
        <div className="breadCrumb">
          {/* Si el listado esta vacio mostrar mensaje */}
          {list.data.items.length === 0 && (
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
      </Styled.Breadcrumb>
      {list.data.items.map((item, idx) => (
        <div key={item.id}>
          <Styled.RowGrid>
            <div
              className={`section contentSection ${idx === 0 ? "first" : ""} ${
                idx === len - 1 ? "last" : ""
              }`}
            >
              <Styled.LeftColumn showTopBorder={idx === 0}>
                <Styled.LinkButton onClick={() => gotoDetail(item.id)}>
                  <Styled.Image src={item.picture} alt="" />
                </Styled.LinkButton>
                <Styled.ContentGrid>
                  <div className="currency">{item.price.currency}</div>
                  <div className="amount">
                    {getNumLocale(item.price.amount)}
                  </div>
                  <div className="free_shipping">
                    {item.free_shipping && (
                      <Styled.IconFreeShip src={ImgFreeShipping} alt="" />
                    )}
                  </div>
                  <div className="title">
                    <Styled.LinkButton onClick={() => gotoDetail(item.id)}>
                      <span>{item.title}</span>
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
                {item.city}
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
    </div>
  );
};
