const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const saveUser = user => {
  const userObj = JSON.parse(user);
  const filePath = path.join(
    __dirname,
    "../",
    "db",
    "users",
    `${userObj.username}.json`
  );
  const writableStream = fs.createWriteStream(filePath);
  writableStream.write(user);
};

const signUpRoute = (request, response) => {
  // Взять данные что пришли

  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;
      console.log("Incoming data!!!!");
      saveUser(body);
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      const resRequest = `{"status": "success","user": ${data.toString(
        "utf-8"
      )}}`;
      response.end(resRequest);
    });

    request.on("end", function() {
      const post = qs.parse(body);
      console.log(post);
    });
  }

  // Взять username с данных, сохранить в переменную

  // Сохраняем данные в <username>.json

  // Сохранить <username>.json в папку users

  // Отправляем файл в ответе с данными юзера
  // использовать response
};

module.exports = signUpRoute;
