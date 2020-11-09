/**
 * Muestra breadcrumb en la seccion de contenido
 */
import React from "react";
import PropTypes from "prop-types";

import Styled from "./Breadcrumb.style";

const Breadcrumb = ({ children }) => {
  return (
    <Styled.Breadcrumb>
      <div className="breadCrumb">{children}</div>
    </Styled.Breadcrumb>
  );
};

Breadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Breadcrumb;
