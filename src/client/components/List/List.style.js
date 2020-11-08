/**
 * Estilos para List.js
 */
import styled from "styled-components";

const Container = styled.div`
  min-width: 640px;
`;

// Imagen mostrada en cada fila
const Image = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 4px;
`;

// Fila, contiene la seccion izquierda con foto y contenido, seccion media esta vacia para poder respetar el grid pero muestra border top y la seccion derecha muestra la ciudad.
const RowGrid = styled.div`
  color: ${(props) => props.theme.colors.black};
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr;
  grid-template-areas: ". . areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaGap areaGap areaGap areaGap areaLocation areaLocation areaLocation . .";

  & .section {
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    flex-direction: column;
  }

  & .contentSection {
    grid-area: areaContent;
    padding: 16px 0px 0px 16px;

    &.first {
      padding: 0px 0px 0px 16px;
      border-top-left-radius: 4px;
    }
    &.last {
      padding: 16px 0px 16px 16px;
    }
  }

  & .middleSection {
    grid-area: areaGap;
    padding-top: 16px;

    &.first {
      padding-top: 0px;
    }
    &.last {
      padding-top: 16px;
    }
  }

  & .locationSection {
    grid-area: areaLocation;
    padding: 16px 16px 0px 0px;

    &.first {
      padding: 0px 16px 0px 0px;
      border-top-right-radius: 4px;
    }
    &.last {
      padding: 16px 16px 16px 0px;
    }
  }
`;

// contenido de la seccion izquierda
const LeftColumn = styled.div`
  border-top: ${(props) =>
    props.showTopBorder ? "0" : `1px solid ${props.theme.colors.graylight}`};
  display: flex;
  flex: 1;
  padding-top: 16px;
`;

// contenido de la seccion central
const MiddleColumn = styled.div`
  border-top: ${(props) =>
    props.showTopBorder ? "0" : `1px solid ${props.theme.colors.graylight}`};
`;

// boton usado como wrap de la foto y titulo
const LinkButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: 18px;
  margin: 0;
  padding: 0;
  text-align: left;
  outline: none;
`;

// contenido de la seccion derecha
const RightColumn = styled.div`
  border-top: ${(props) =>
    props.showTopBorder ? "0" : `1px solid ${props.theme.colors.graylight}`};
  flex: 1;
  font-size: 12px;
  padding-top: 32px;
`;

// Grid para los textos a la dewrecha de la foto: currency, amount, icono para free shipping y title.
const ContentGrid = styled.div`
  display: grid;
  padding: 16px;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "areaCurrency areaAmount areaFreeShip"
    "areaTitle areaTitle areaTitle";
  font-size: 18px;
  grid-column-gap: 8px;
  grid-row-gap: 16px;

  .currency {
    grid-area: areaCurrency;
  }
  .amount {
    grid-area: areaAmount;
  }
  .free_shipping {
    padding: 0;
    grid-area: areaFreeShip;
    display: flex;
  }
  .title {
    grid-area: areaTitle;
  }
`;

export default {
  Container,
  Image,
  RowGrid,
  LeftColumn,
  MiddleColumn,
  LinkButton,
  RightColumn,
  ContentGrid,
};
