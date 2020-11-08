import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

export default () => {
  const {
    item: { selectedItem, loading },
  } = useSelector((state) => state);

  if (loading) {
    return <Loader />;
  }

  if (!selectedItem) {
    return <div>No hay item seleccionado.</div>;
  }
  return <div>{JSON.stringify(selectedItem)}</div>;
};
