import React from "react";
import { useSelector } from "react-redux";

export default () => {
  const {
    item: { selectedItem, loading },
  } = useSelector((state) => state);

  if (loading) {
    return <div>loading</div>;
  }

  if (!selectedItem) {
    return <div>No hay item seleccionado.</div>;
  }
  return <div>TEST</div>;
  // return <div>{JSON.stringify(selectedItem)}</div>;
};
