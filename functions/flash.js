require("dotenv").config();
const { URL } = require("url");
// const { writeFile } = require('fs');
const fetch = require("node-fetch");

exports.handler = async () => {
  const api = new URL("https://api.apiflash.com/v1/urltoimage");
  const urlToView = new URL("https://www.twitch.tv/thesolidiceman");

  api.searchParams.set("access_key", process.env.ACCESS_KEY);
  api.searchParams.set("url", urlToView);

  const data = await fetch(api)
    .then((response) => response.buffer())
    .then((buf) => `data:image/jpeg;base64,` + buf.toString("base64"));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// exports.handler = async () => {
//   const api = new URL("https://api.apiflash.com/v1/urltoimage");

//   const urlToView = new URL("http://twitch.com/");

//   api.searchParams.set("access_key", process.env.ACCESS_KEY);
//   api.searchParams.set("response_type", "json");
//   api.searchParams.set("url", urlToView);

//   const getFlash = await fetch(api).then((response) => response.json());

//   return {
//     statusCode: 200,
//     body: JSON.stringify(getFlash),
//   };
// };
