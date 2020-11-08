import React from "react";
import { useSelector } from "react-redux";

import Breadcrumb from "../shared/Breadcrumb/Breadcrumb";
import Loader from "../shared/Loader/Loader";

import Styled from "./ListItem.style";
import FreeShipping from "../shared/FreeShipping/FreeShipping";
import { getCondition, getNumLocale } from "../../shared/utils";

export default () => {
  const {
    item: { selectedItem, loading },
  } = useSelector((state) => state);

  if (loading) {
    return <Loader />;
  }

  if (!selectedItem) {
    return <div>No hay item seleccionado.</div>;
  }

  const {
    picture,
    condition,
    sold_quantity,
    title,
    price: { currency, amount, free_shipping },
    description,
  } = selectedItem;

  console.log("selectedItem", selectedItem);
  // console.log("picture", picture);

  return (
    <Styled.Container>
      <Breadcrumb>
        <span>(No hay data param mostrar breadcrumb)</span>
      </Breadcrumb>
      <Styled.Grid>
        <div className="gridCell image">
          <Styled.Image src={picture} alt="" />
        </div>
        <div className="gridCell sold">{`${getCondition(
          condition
        )} - ${sold_quantity} vendidos`}</div>
        <div className="gridCell title">{title}</div>
        <div className="gridCell space" />
        <div className="gridCell price">
          <span>{currency}</span>
          <span>{getNumLocale(amount)}</span>
          <span>
            <FreeShipping free_shipping={free_shipping} />
          </span>
        </div>
        <div className="gridCell buttonWrap">
          <Styled.Button>Comprar</Styled.Button>
        </div>
        <div className="gridCell titleDesc">
          Descripci&oacute;n del producto
        </div>
        <div className="gridCell space2" />
        <div className="gridCell description">{description}</div>
        <div className="gridCell space3" />
      </Styled.Grid>
    </Styled.Container>
  );
};
