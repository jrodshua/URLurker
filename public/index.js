const container = document.querySelector(".screenshot");
const form = document.querySelector("#api-form");
const loading = document.querySelector(".not-loading");

function isLoading(bool) {
  if (bool) {
    loading.classList.remove("not-loading");
  } else {
    loading.classList.add("not-loading");
  }
}

async function getScreenShot(urlObj) {
  isLoading(true);
  const result = await fetch("/.netlify/functions/flash", {
    method: "POST",
    body: JSON.stringify(urlObj),
  }).then((response) => {
    isLoading(false);
    return response.json();
  });

  return result;
}

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const url = { url: data.get("form-url") };

  const apiImg = await getScreenShot(url);

  const img = document.createElement("img");
  img.src = apiImg;
  img.alt = `Screenshot of ${url.url}`;

  container.appendChild(img);
}

form.addEventListener("submit", handleSubmit);
