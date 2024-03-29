require("dotenv").config();
const { URL } = require("url");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { url } = JSON.parse(event.body);

  const api = new URL("https://api.apiflash.com/v1/urltoimage");
  const formUrl = new URL(url);

  api.searchParams.set("access_key", process.env.ACCESS_KEY);
  api.searchParams.set("thumbnail_width", 720);
  api.searchParams.set("url", formUrl);

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
//   const urlToView = new URL("https://www.twitch.tv/jrodshua");

//   api.searchParams.set("access_key", process.env.ACCESS_KEY);
//   api.searchParams.set("url", urlToView);

//   const data = await fetch(api)
//     .then((response) => response.buffer())
//     .then((buf) => `data:image/jpeg;base64,` + buf.toString("base64"));

//   return {
//     statusCode: 200,
//     body: JSON.stringify(data),
//   };
// };
