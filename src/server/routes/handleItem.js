const axios = require("axios");

const { validateId } = require("./utils");

const mockData = require("../../../mockdata/item.json");
const { MAX_ID_LEN, URL_PREFIX_ITEM } = require("../constants.js");
const { destructureItem } = require("./utils");

const re = /^[a-z0-9]+$/i;

// TODO agregar author
// const mockData = require("../../../mockdata/item.json");

async function handleItem(req) {
  try {
    const response = {
      author: {
        name: "John",
        lastname: "Doe",
      },
      item: destructureItem(mockData, true),
    };

    return { code: 1, message: "OK", data: response };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }

  // const {
  //   params: { id },
  // } = req;
  // try {
  //   validateId(id);
  //   const { data } = await axios.get(`${URL_PREFIX_ITEM}${id}`);
  //   console.log("resp", JSON.stringify(data));
  //   return { code: 1, message: "OK", data };
  // } catch (error) {
  //   console.log("error", error);
  //   return { code: 2, message: "ERROR", data: {} };
  // }
}

module.exports = {
  handleItem,
};
