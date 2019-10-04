const fs = require("fs");
const path = require("path");
const url = require("url");
const productRoute = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const filePath = path.join(
    __dirname,
    "../",
    "db",
    "products",
    "all-products.json"
  );
  const readStream = fs.createReadStream(filePath);
  if (parsedUrl.query) {
    const queryArr = parsedUrl.query.split(',');
    queryArr[0] = queryArr[0].replace("ids=%27", '');
    queryArr[queryArr.length - 1] = queryArr[queryArr.length - 1].replace('%27', "");
    const resArr = [];
    readStream.on("data", (chunk) => {
      const chunkObj = JSON.parse(chunk.toString());
      queryArr.map((el) => {
        for (variable in chunkObj) {
          if (chunkObj[variable].id === Number(el)) {
            resArr.push(chunkObj[variable]);
          }
        }
      })
    });
    readStream.on('end', () => {
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      if (resArr.length === 0) {
        const result = {
          "status": "no products",
          "products": []
        };
        response.write(JSON.stringify(result));
        response.end();
      } else {

        const result = {
          "status": "success",
          "products": resArr
        };
        response.write(JSON.stringify(result));
        response.end();
      }
    });
  } else if (parsedUrl.pathname === '/products') {
    console.log("products querie");
    response.writeHead(200, {
      "Content-Type": "application/json"
    });

    readStream.pipe(response);
  } else {
    console.log(parsedUrl);
    // const query = parsedUrl.pathname.split('/');
    console.log("123");
  }

};
module.exports = productRoute;
