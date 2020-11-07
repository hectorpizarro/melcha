import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setSearchTerm, submitSearch } from "../redux/rootReducer";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    root: { searchTerm },
  } = useSelector((state) => state);

  const onSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    dispatch(submitSearch());
    history.push(`/items?search=${searchTerm}`);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      console.log("do validate");
      onSubmit();
    }
  };

  const onChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm({ searchTerm: newSearchTerm }));
  };

  return (
    <div>
      <div>this is the search bar</div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={searchTerm}
          placeholder="Nunca dejes de buscar"
        />
      </form>
    </div>
  );
};
