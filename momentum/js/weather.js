const weatherElem = document.getElementById("weather");
const weatherCityElem = document.getElementById("city");
const weatherIconElem = weatherElem.querySelector(".weather__icon");
const weatherTempElem = weatherElem.querySelector(".weather__temperature");
const weatherWindElem = weatherElem.querySelector(".weather__wind");
const weatherHumidityElem = weatherElem.querySelector(".weather__humidity");
const weatherDescriptionElem = weatherElem.querySelector(".weather__description");

const queryURL = "https://api.openweathermap.org/data/2.5/weather?";
const queryParams = {
  q: "London",
  lang: "en",
  appid: "5789e29f6babe209ee2edb0893b52a14",
  units: "metric",
};

/*
  working functions
*/
// request handling
async function setData() {
  let json = await getData();
  if (json.cod !== 200) manageError(json);
  else manageResponse(json);
}

async function getData() {
  let urlObj = new URL(queryURL);
  for (let param in queryParams) {
    urlObj.searchParams.append(param, queryParams[param]);
  }

  const json = await fetch(urlObj)
    .then((res) => res.json())
    .catch((err) => {
      if (err.cod === "404") return { cod, message };
      else throw err;
    });
  return json;
}

function manageError({ message }) {
  resetIcon();
  weatherElem.classList.add("weather--error");
  weatherTempElem.textContent = "";
  weatherWindElem.textContent = "";
  weatherHumidityElem.textContent = "";
  weatherIconElem.innerHTML = `<svg class="weather__error-icon" viewBox="0 0 512 512"><use href="#cross-icon"></use></svg>`;
  weatherDescriptionElem.textContent = "ERROR: " + message;
}

function manageResponse({ weather, main, wind }) {
  if (weatherElem.classList.contains("weather--error")) {
    weatherElem.classList.remove("weather--error");
  }
  resetIcon();
  weatherIconElem.classList.add(`owf-${weather[0].id}`);
  weatherTempElem.textContent = `${main.temp} °C (feels like ${main.feels_like} °C)`;
  weatherWindElem.textContent = `Humidity: ${main.humidity}%`;
  weatherHumidityElem.textContent = `Wind: ${wind.speed} m/s ${formatWindDirection(wind.deg)}`;
  weatherDescriptionElem.textContent = weather[0].description;
}

function resetIcon() {
  weatherIconElem.innerHTML = "";
  if (weatherIconElem.classList.length > 2) {
    weatherIconElem.className = weatherIconElem.className.split(" ").slice(0, 2).join(" ");
  }
}

// input
function storeCity() {
  localStorage.setItem(this.id, this.value);
  this.value = "";
}

function resetCity() {
  this.value = localStorage.getItem(this.id);
}

async function manageKeydown(event) {
  if (event.key === "Escape") {
    resetCity.call(this);
  }
  if (event.key === "Enter") {
    let entry = this.value.trim();
    if (entry === "") this.value = localStorage.getItem(this.id);
    else {
      localStorage.setItem(this.id, entry);
      queryParams.q = entry;
    }
    setData();
    this.blur();
  }
}

/*
  helper functions
*/

function formatWindDirection(num) {
  const dirs = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  const sector = Math.abs(Math.ceil((num - 11.25) / 22.5));
  return dirs[sector];
}

/*
  initialization
*/
if (localStorage.getItem("city") !== null) {
  let city = localStorage.getItem("city");
  queryParams.q = city;
  weatherCityElem.value = city;
} else {
  localStorage.setItem("city", weatherCityElem.value);
}
setData();

weatherCityElem.addEventListener("click", storeCity);
weatherCityElem.addEventListener("blur", resetCity);
weatherCityElem.addEventListener("keydown", manageKeydown);
