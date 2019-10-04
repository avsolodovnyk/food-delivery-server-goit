const http = require("http");
const url = require("url");

const morgan = require("morgan");
const router = require("./routes/router");
const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((request, response) => {
    // Get route from the request
    const parsedUrl = url.parse(request.url);
    const func = function () {
      if (parsedUrl.pathname.includes('/products')) {
        return router['/products'](request, response);
      } else {
        return router.default(request, response);
      }
    }
    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;
