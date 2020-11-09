/**
 * CSS Loader usado en toda la app
 * Fuente: https://loading.io/css/
 */
import React from "react";
import PropTypes from "prop-types";

import Styled from "./Loader.style";

const Loader = ({ height }) => {
  return (
    <Styled.Wrap height={height}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Styled.Wrap>
  );
};

Loader.propTypes = {
  height: PropTypes.string,
};

Loader.defaultProps = {
  height: "inherit",
};

export default Loader;
