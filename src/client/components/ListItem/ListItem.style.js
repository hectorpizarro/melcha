/**
 * Estilos para ListItem.js
 */
import styled from "styled-components";

const Container = styled.div`
  min-width: 1150px;
  padding-bottom: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr;
  grid-template-rows: auto auto auto 1fr;
  grid-template-areas:
    ". . areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaSold areaSold areaSold areaSold areaSold . ."
    ". . areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaTitle areaTitle areaTitle areaTitle areaSpace . ."
    ". . areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaPrice areaPrice areaPrice areaPrice areaPrice . ."
    ". . areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaImage areaButton areaButton areaButton areaButton areaButton . ."
    ". . areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaTitleDesc areaSpace2 areaSpace2 areaSpace2 areaSpace2 areaSpace2 . ."
    ". . areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaDesc areaSpace3 areaSpace3 areaSpace3 areaSpace3 areaSpace3 . .";

  .gridCell {
    background-color: ${(props) => props.theme.colors.white};
  }
  .image {
    padding: 32px 0px 0px 32px;
    grid-area: areaImage;
  }
  .sold {
    padding: 32px 32px 0px 0px;
    grid-area: areaSold;
    font-size: 14px;
  }
  .title {
    padding-top: 16px;
    grid-area: areaTitle;
    font-size: 24px;
    font-weight: bold;
  }
  .space {
    grid-area: areaSpace;
  }
  .space2 {
    grid-area: areaSpace2;
  }
  .space3 {
    grid-area: areaSpace3;
  }
  .price {
    padding: 32px 32px 32px 0px;
    grid-area: areaPrice;
    font-size: 46px;

    & span {
      margin-right: 16px;
    }
  }
  .buttonWrap {
    padding: 0px 64px 0px 0px;
    grid-area: areaButton;
    font-size: 14px;
  }
  .titleDesc {
    padding: 32px 0px 32px 32px;
    grid-area: areaTitleDesc;
    font-size: 28px;
  }
  .description {
    padding: 0px 0px 32px 32px;
    grid-area: areaDesc;
    font-size: 16px;
  }
`;

const Image = styled.img`
  width: 680px;
`;

const Button = styled.button`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue};
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 0;
  outline: none;
  cursor: pointer;
`;

export default {
  Container,
  Grid,
  Image,
  Button,
};
