import React from "react";
import styled from "styled-components";

import "./Loader.css";

const StyledWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Loader = () => {
  return (
    <StyledWrap>
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
    </StyledWrap>
  );
};

export default Loader;
