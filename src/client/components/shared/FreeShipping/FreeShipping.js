import React from "react";
import PropTypes from "prop-types";

import ImgFreeShipping from "./images/ic_shipping@2x.png.png.png";

import Styled from "./FreeShipping.style";

const FreeShipping = ({ free_shipping }) => {
  if (!free_shipping) {
    return null;
  }

  return <Styled.IconFreeShip src={ImgFreeShipping} alt="" />;
};

FreeShipping.propTypes = {
  free_shipping: PropTypes.bool,
};

FreeShipping.defaultProps = {
  free_shipping: false,
};

export default FreeShipping;
