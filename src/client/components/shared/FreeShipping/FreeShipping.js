import React from "react";
import ImgFreeShipping from "./images/ic_shipping@2x.png.png.png";

import Styled from "./FreeShipping.style";

export default ({ free_shipping }) => {
  if (!free_shipping) {
    return null;
  }

  return <Styled.IconFreeShip src={ImgFreeShipping} alt="" />;
};
