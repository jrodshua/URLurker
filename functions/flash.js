require("dotenv").config();
const { URL } = require("url");
// const { writeFile } = require('fs');
const fetch = require("node-fetch");

exports.handler = async () => {
  const api = new URL("https://api.apiflash.com/v1/urltoimage");
  const urlToView = new URL("https://www.twitch.tv/jrodshua");

  api.searchParams.set("access_key", process.env.ACCESS_KEY);
  api.searchParams.set("url", urlToView);

  function getScreenShot(apiUrl, retry = 2) {
    return fetch(apiUrl)
      .then(async (response) => {
        if (response.ok) {
          return await response
            .buffer()
            .then((buf) => `data:image/jpeg;base64,` + buf.toString("base64"));
        }

        if (retry > 0) {
          return getScreenShot(apiUrl, retry - 1);
        } else {
          throw new Error(response);
        }
      })
      .catch(console.error);
  }

  const data = getScreenShot(api);

  // const data = await fetch(api)
  //   .then((response) => response.buffer())
  //   .then((buf) => `data:image/jpeg;base64,` + buf.toString("base64"));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
