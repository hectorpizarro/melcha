const axios = require("axios");

const { validateId } = require("./utils");

const mockData = require("../../../mockdata/itemDescription.json");
const { URL_PREFIX_ITEM } = require("../constants.js");
// const { destructureItem } = require("./utils");

// TODO agregar author
// const mockData = require("../../../mockdata/item.json");

async function handleItemDescription(req) {
  try {
    const { plain_text: description } = mockData;
    return { code: 1, message: "OK", data: description };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }
  // const {
  //   params: { id },
  // } = req;
  // try {
  //   validateId(id);
  //   const { data } = await axios.get(`${URL_PREFIX_ITEM}${id}/description`);
  //   console.log("resp", JSON.stringify(data));
  //   return { code: 1, message: "OK", data };
  // } catch (error) {
  //   console.log("error", error);
  //   return { code: 2, message: "ERROR", data: {} };
  // }
}

module.exports = {
  handleItemDescription,
};
