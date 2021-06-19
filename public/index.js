const container = document.querySelector(".screenshot");
const button = document.querySelector("#button");

async function onButtonClick() {
  const screenShot = await fetch("/.netlify/functions/flash").then((response) =>
    response.json()
  );

  if (screenShot === "error") {
    const errorText = document.createElement("span");
    errorText.innerText(
      "There was an error, please refresh your browser and try again"
    );
    container.appendChild(errorText);
  }

  const img = document.createElement("img");
  img.src = screen;
  img.alt = "Jrodshua twitch channel";

  container.appendChild(img);
}

button.addEventListener("click", onButtonClick);
