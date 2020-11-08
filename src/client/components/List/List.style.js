/**
 * Estilos para List.js
 */
import styled from "styled-components";

const Image = styled.img`
  width: 180px;
  height: 180px;
  /* border: 1px dotted green; */
  border-radius: 4px;
`;

const Breadcrumb = styled.div`
  display: grid;
  grid-template-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr;
  grid-template-areas: ". . areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText areaText . .";

  .breadCrumb {
    color: ${(props) => props.theme.colors.gray};
    font-size: 14px;
    grid-area: areaText;
    padding: 16px 0px;
  }
`;

const RowGrid = styled.div`
  color: ${(props) => props.theme.colors.black};
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr;
  grid-template-areas: ". . areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaContent areaLocation areaLocation areaLocation . .";

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

const LeftColumn = styled.div`
  border-top: ${(props) =>
    props.showTopBorder ? "0" : `1px solid ${props.theme.colors.graylight}`};
  display: flex;
  flex: 1;
  padding-top: 16px;
`;
const RightColumn = styled.div`
  border-top: ${(props) =>
    props.showTopBorder ? "0" : `1px solid ${props.theme.colors.graylight}`};
  flex: 1;
  font-size: 12px;
  padding-top: 32px;
`;

const ContentGrid = styled.div`
  display: grid;
  padding: 16px;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "areaCurrency areaAmount areaFreeShip"
    "areaTitle areaTitle areaTitle";
  font-size: 18px;
  grid-column-gap: 4px;
  grid-row-gap: 16px;

  .currency {
    grid-area: areaCurrency;
    /* background-color: yellow; */
    align-self: end;
  }
  .amount {
    grid-area: areaAmount;
    /* background-color: red; */
    align-self: end;
  }
  .free_shipping {
    grid-area: areaFreeShip;
    /* background-color: blue; */
    align-self: center;
  }
  .title {
    /* background-color: green; */
    grid-area: areaTitle;
  }
`;

const IconFreeShip = styled.img`
  height: 16px;
`;

export default {
  Breadcrumb,
  Image,
  RowGrid,
  LeftColumn,
  RightColumn,
  ContentGrid,
  IconFreeShip,
};
