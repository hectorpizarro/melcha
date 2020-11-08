import { TOP_CAT_LEN } from "./constants";

/**
 * Retorna array de categorias a mostrar. En las pruebas retorna muchas categorias, asi que para este test retorna solo el top 5.
 * @param {Array} categories - Array de strings con categorias
 * @returns {Array} - top 5 de categorias reordenadas
 */
export const getBreadcrumb = (categories) => {
  let count = TOP_CAT_LEN - 1;
  let resp = [];
  for (let i = 0; i < categories.length && count >= 0; i++) {
    resp.push(categories[i]);
    count = count - 1;
  }

  return resp.reverse();
};

/**
 * Retorna el numero recibido como string, agregando separadores.
 * Ejemplo: 1234567 retorna 1.234.567
 * @param {Number} num - Numero
 * @returns {String}
 */
export const getNumLocale = (num) => num.toLocaleString().replaceAll(",", ".");
