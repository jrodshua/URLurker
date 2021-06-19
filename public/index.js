const container = document.querySelector(".screenshot");
const button = document.querySelector("#button");

async function onButtonClick() {
  // const screen = await fetch("/.netlify/functions/flash").then((response) => response.json());
  const screenGrab = await fetch("/.netlify/functions/flash").then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const resError = response.text();
        return Promise.reject(new Error(resError));
      }
    }
  );

  const img = document.createElement("img");
  const loadingMessage = document.createElement("span");

  img.src = screenGrab;
  img.alt = "thesolidiceman twitch channel";
  loadingMessage.innerText = "Loading...";

  screenGrab
    ? container.appendChild(img)
    : container.appendChild(loadingMessage);
}

button.addEventListener("click", onButtonClick);
