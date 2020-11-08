module.exports = {
  MAX_ID_LEN: 100,
  // Para API request de listados. Ejemplo:
  // https://api.mercadolibre.com/sites/MLA/search?q=cafe
  URL_PREFIX_QUERY: "https://api.mercadolibre.com/sites/MLA/search?q=",

  // Para API request de detalles de un item. Ejemplos:
  // https://api.mercadolibre.com/items/​123
  // https://api.mercadolibre.com/items/​123​/description
  URL_PREFIX_ITEM: "https://api.mercadolibre.com/items/",

  // Nombre de header usado como auth token para retornar Author data
  TOKEN_ID: "x-token",
};
