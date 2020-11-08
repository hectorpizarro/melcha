/**
 * Muestra breadcrumb en la seccion de contenido
 */
import React from "react";

import Styled from "./Breadcrumb.style";

export default ({ children }) => {
  return (
    <Styled.Breadcrumb>
      <div className="breadCrumb">{children}</div>
    </Styled.Breadcrumb>
  );
};
