const container = document.querySelector(".screenshot");
const button = document.querySelector("#button");

async function onButtonClick() {
  const screen = await fetch("/.netlify/functions/flash-background").then(
    async (response) => await response.json()
  );

  const img = document.createElement("img");
  const loadText = document.createElement("p");

  if (!screen) {
    loadText.innerText("Loading...");
    container.appendChild(loadText);
  }
  img.src = screen;
  img.alt = "solidiceman on twitch";
  container.appendChild(img);
}

button.addEventListener("click", onButtonClick);
