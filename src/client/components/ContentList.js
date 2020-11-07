import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const {
    root: { list },
  } = useSelector((state) => state);

  if (!list) {
    return <div>No results</div>;
  }

  return <div>SEARCH RESULT: {JSON.stringify(list)}</div>;
};
