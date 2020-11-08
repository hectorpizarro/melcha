const axios = require("axios");

const { URL_PREFIX_QUERY, TOKEN_ID } = require("../constants.js");
const { destructureItem, getAuthor } = require("./utils");

async function handleQueryMocked(req) {
  const {
    query: { q: myQuery },
  } = req;
  console.log("query", myQuery);
  const mockData = require("../../../mockdata/items.json");
  try {
    const { results, available_filters } = mockData;
    const catObjects = available_filters.find(
      ({ id }) => id === "category"
    ) || { values: [] };
    const categories = catObjects.values.map(({ name }) => name);
    const items = results.map((rawItem) => destructureItem(rawItem, false));

    const response = {
      author: getAuthor(req.headers[TOKEN_ID]),
      categories,
      items,
    };

    return { code: 1, message: "OK", data: response };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }
}

async function handleQuery(req) {
  const {
    query: { q: myQuery },
  } = req;
  try {
    const {
      data: { results, available_filters },
    } = await axios.get(`${URL_PREFIX_QUERY}${encodeURI(myQuery)}&limit=4`);

    const catObjects = available_filters.find(
      ({ id }) => id === "category"
    ) || { values: [] };
    const categories = catObjects.values.map(({ name }) => name);
    const items = results.map((rawItem) => destructureItem(rawItem, false));

    const data = {
      author: getAuthor(req.headers[TOKEN_ID]),
      categories,
      items,
    };

    return { code: 1, message: "OK", data };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }
}

module.exports = {
  handleQuery,
};
