/**
 * Estilos para Search.js
 */
import styled from "styled-components";

// Contenedor principal
const Container = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.yellow};
  display: flex;
  font-size: 18px;
  height: 3rem;
`;

// Contenedor solo contiene un elemento con css-grid. Grid define dos areas,
// Una para logo otra para el search DIV que a su vez contiene input y button
const Grid = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr;
  grid-template-areas: ". . areaLogo areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch areaSearch . .";

  & .logo {
    grid-area: areaLogo;
  }
  & .search {
    grid-area: areaSearch;
    display: flex;
  }
`;

// Search input
const Input = styled.input`
  background-color: ${(props) => props.theme.colors.white};
  border: 0px;
  color: ${(props) => props.theme.colors.black};
  flex-grow: 1;
  outline: none;
  padding: 0 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.graylight};
  }
`;

// Search button
const Button = styled.button`
  align-items: center;
  border: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  outline: none;
  padding: 0;
  width: 2rem;
  min-width: 2rem;
`;

// Logo img visible en el grid area de logo
const ImgLogo = styled.img`
  height: 1.5rem;
`;

// Lupa img visible dentro de boton
const ImgSearch = styled.img`
  height: 1rem;
`;

export default { Container, Grid, Input, ImgLogo, ImgSearch, Button };
