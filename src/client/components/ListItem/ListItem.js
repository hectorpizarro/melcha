import React from "react";
import { useSelector } from "react-redux";

export default () => {
  const {
    root: { selectedItem },
  } = useSelector((state) => state);

  if (!selectedItem) {
    return <div>No hay item seleccionado.</div>;
  }

  return <div>{JSON.stringify(selectedItem)}</div>;
};
