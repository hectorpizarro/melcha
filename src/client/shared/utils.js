import { TOP_CAT_LEN } from "./constants";

export const getBreadcrumb = (categories) => {
  let count = TOP_CAT_LEN - 1;
  let resp = [];
  for (let i = 0; i < categories.length && count >= 0; i++) {
    resp.push(categories[i]);
    count = count - 1;
  }

  return resp.reverse();
};

export const getNumLocale = (num) => num.toLocaleString().replaceAll(",", ".");
