const container = document.querySelector(".screenshot");
const form = document.querySelector("#api-form");

function isLoading(bool) {
  const loading = document.querySelector(".not-loading");

  if (bool) {
    loading.classList.add(".is-loading");
  } else {
    loading.classList.remove(".is-loading");
  }
}

async function getScreenShot(urlObj) {
  const result = await fetch("/.netlify/functions/flash", {
    method: "POST",
    body: JSON.stringify(urlObj),
  }).then((response) => response.json());

  isLoading(false);
  return result;
}

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const url = { url: data.get("form-url") };

  isLoading(true);
  const apiImg = await getScreenShot(url);

  const img = document.createElement("img");
  img.src = apiImg;
  img.alt = `Screenshot of ${url.url}`;

  container.appendChild(img);
}

form.addEventListener("submit", handleSubmit);
