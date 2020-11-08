const axios = require("axios");

const { validateId } = require("./utils");

const { URL_PREFIX_ITEM } = require("../constants.js");
const { destructureItem } = require("./utils");

async function handleItemMocked(req) {
  const mockData = require("../../../mockdata/item.json");
  const mockDescription = require("../../../mockdata/itemDescription.json");
  try {
    const response = {
      author: {
        name: "John",
        lastname: "Doe",
      },
      item: destructureItem(mockData, true, mockDescription.plain_text),
    };
    console.log("req.headers", req.headers);

    return { code: 1, message: "OK", data: response };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }
}

function getItemPromise(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: dataItem } = await axios.get(`${URL_PREFIX_ITEM}${id}`);
      resolve(dataItem);
    } catch (error) {
      reject(error);
    }
  });
}

function getDescriptionPromise(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { plain_text: description },
      } = await axios.get(`${URL_PREFIX_ITEM}${id}/description`);
      resolve(description);
    } catch (error) {
      reject(error);
    }
  });
}

async function handleItem(req) {
  const {
    params: { id },
  } = req;
  try {
    validateId(id); // throws error if invalid
    const myId = encodeURI(id);
    const [dataItem, description] = await Promise.all([
      getItemPromise(myId),
      getDescriptionPromise(myId),
    ]);
    const data = destructureItem(dataItem, true, description);
    return { code: 1, message: "OK", data };
  } catch (error) {
    console.log("error", error);
    return { code: 2, message: "ERROR", data: {} };
  }
}

module.exports = {
  handleItemMocked,
  handleItem,
};
