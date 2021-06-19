const container = document.querySelector(".screenshot");
// const button = document.querySelector("#button");
const form = document.querySelector("#api-form");

// async function getScreenShot() {
//   const data = await fetch("/.netlify/functions/flash")
//     .then((response) => response.json())
//     .catch((error) => error);

//   return data;
// }

// async function onButtonClick() {
//   const apiData = await getScreenShot();

//   if (!apiData) {
//     const errorText = document.createElement("span");
//     errorText.innerText = "there was an error, please try again";
//     container.appendChild(errorText);
//   }
//   const img = document.createElement("img");
//   img.src = apiData;
//   img.alt = "jrodshua twitch";
//   container.appendChild(img);
// }

// button.addEventListener("click", onButtonClick);

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const result = await fetch("/.netlify/functions/flash", {
    method: "POST",
    body: JSON.stringify({
      url: data.get("form-url"),
    }),
  }).then((response) => response.json());

  const img = document.createElement("img");
  img.src = result;
  img.alt = "jrodshua twitch";
  container.appendChild(img);
}

form.addEventListener("submit", handleSubmit);
