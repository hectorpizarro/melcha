const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const express = require("express");

const webpackConfig = require("./webpack.config");
const routes = require("./routes/index");

const app = express();
const compiler = webpack(webpackConfig);

if (webpackConfig.mode === "production") {
  app.use(express.static("dist"));
} else {
  app.use(middleware(compiler, { writeToDisk: true }));
  app.use(hotMiddleware(compiler));

  require("node-hot").configure({
    exclude: [/[/\\]node_modules[/\\]/],
  });
}
app.use((req, res, next) => {
  routes.handle(req, res, next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
