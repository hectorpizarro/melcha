const { Router } = require("express");

const { handleQuery } = require("./handleQuery");
const { handleItem } = require("./handleItem");
const { handleItemDescription } = require("./handleItemDescription");

const router = Router();
router.get("/api/items", async (req, res) => res.send(await handleQuery(req)));
router.get("/api/item/:id", async (req, res) => {
  res.send(await handleItem(req));
});
router.get("/api/item/:id/description", async (req, res) => {
  res.send(await handleItemDescription(req));
});

if (module.hot) {
  module.hot.accept();
}

module.exports = router;
