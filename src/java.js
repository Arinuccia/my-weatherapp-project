let now = new Date();
let changeHour = document.querySelector("#current-hour");
let changeDate = document.querySelector("#current-date");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
changeHour.innerHTML = `${day},${hours}:${minutes} `;
changeDate.innerHTML = `${month},${date}th`;

function showTemperature(response) {
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(((temperature.innerHTML - 32) * 5) / 9);
}
function changeFarhenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round((temperature.innerHTML * 9) / 5 + 32);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityWeather);

let currentPositionButton = document.querySelector("button");
currentPositionButton.addEventListener("click", getPosition);

let celsius = document.querySelector("#celsius-temp");
celsius.addEventListener("click", changeCelsius);

let farhenheit = document.querySelector("#farhenheit-temp");
farhenheit.addEventListener("click", changeFarhenheit);

search("New York");
