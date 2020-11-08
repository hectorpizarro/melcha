const { Router } = require("express");
const path = require("path");

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

router.get("/items/:file", (req, res) => {
  const {
    params: { file },
  } = req;
  if (/\.(png|js|json)/i.test(file)) {
    res.sendFile(path.join(__dirname, "..", "..", "..", `/dist/${file}`));
  } else {
    res.sendFile(path.join(__dirname, "..", "..", "..", "/dist/index.html"));
  }
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "..", "/dist/index.html"));
});

if (module.hot) {
  module.hot.accept();
}

module.exports = router;
