const container = document.querySelector(".screenshot");
const button = document.querySelector("#button");

async function onButtonClick() {
  const screen = await fetch("/.netlify/functions/flash").then((response) =>
    response.json()
  );

  const img = document.createElement("img");
  img.src = screen;
  img.alt = "twitch site";

  container.appendChild(img);
}

button.addEventListener("click", onButtonClick);
