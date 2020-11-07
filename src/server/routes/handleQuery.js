const axios = require("axios");

const { URL_PREFIX_QUERY } = require("../constants.js");

// TODO agregar author
const mockData = require("../../../mockdata/items.json");
const { destructureItem } = require("./utils");

async function handleQuery(req) {
  const {
    query: { q: myQuery },
  } = req;
  console.log("query", myQuery);
  try {
    const { results, available_filters } = mockData;
    const catObjects = available_filters.find(
      ({ id }) => id === "category"
    ) || { values: [] };
    const categories = catObjects.values.map(({ name }) => name);
    const items = results.map((rawItem) => destructureItem(rawItem, false));

    const response = {
      author: {
        name: "John",
        lastname: "Doe",
      },
      categories,
      items,
    };

    return { code: 1, message: "OK", data: response };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }
  // try {
  //   const {
  //     data: { results, available_filters },
  //   } = await axios.get(`${URL_PREFIX_QUERY}${myQuery}&limit=4`);

  //   const catObjects = available_filters.find(
  //     ({ id }) => id === "category"
  //   ) || { values: [] };
  //   const categories = catObjects.values.map(({ name }) => name);
  //   const items = results.map((rawItem) => destructureItem(rawItem, false));

  //   const data = {
  //     author: {
  //       name: "John",
  //       lastname: "Doe",
  //     },
  //     categories,
  //     items,
  //   };

  //   return { code: 10, message: "OK", data };
  // } catch (error) {
  //   console.log("error", error);
  //   return { code: 2, message: "ERROR", data: {} };
  // }
}

module.exports = {
  handleQuery,
};
