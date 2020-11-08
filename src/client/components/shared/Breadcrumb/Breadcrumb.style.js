/**
 * Estilos para Breadcrumb
 */
import styled from "styled-components";

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

export default { Breadcrumb };
