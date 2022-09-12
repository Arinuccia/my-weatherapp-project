function showTemperature(response) {
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemperature = response.data.main.temp;
}
function search(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function changeCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function changeFarhenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let farhenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farhenheitTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityWeather);

let currentPositionButton = document.querySelector("button");
currentPositionButton.addEventListener("click", getPosition);

let celsius = document.querySelector("#celsius-temp");
celsius.addEventListener("click", changeCelsius);

let farhenheit = document.querySelector("#farhenheit-temp");
farhenheit.addEventListener("click", changeFarhenheit);

search("New York");
