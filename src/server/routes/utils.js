const { MAX_ID_LEN } = require("../constants.js");

const regExpId = /^[a-z0-9]+$/i;

function getDecimals(num) {
  const str = `${num}`;
  const arr = str.split(".");
  return arr.length === 2 ? arr[1] : 0;
}

function destructureItem(rawItem, isDetail) {
  try {
    const {
      id,
      title,
      thumbnail,
      pictures,
      condition,
      shipping: { free_shipping },
      currency_id: currency,
      price,
      sold_quantity,

      // Las instrucciones no indicaban este campo, pero lo necesito para mostrar ciudad en el frontend
      seller_address: {
        city: { name: city },
      },
    } = rawItem;
    const amount = Math.floor(price);
    const item = {
      id,
      title,
      price: {
        currency,
        amount,
        decimals: getDecimals(price),
      },
      condition,
      free_shipping,
      city,
    };
    if (isDetail) {
      item.sold_quantity = sold_quantity;
      item.picture = pictures.length > 0 ? pictures[0].url : thumbnail;
    } else {
      item.picture = thumbnail;
    }
    return item;
  } catch (error) {
    console.log("Estructura del item es invalida.");
    throw new Error(error);
  }
}

function validateId(id) {
  if (!regExpId.test(id) || id.length > MAX_ID_LEN) {
    throw new Error("Id inv&aacute;lido.");
  }
  return true;
}

module.exports = {
  destructureItem,
  getDecimals,
  validateId,
};
