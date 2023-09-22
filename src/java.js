function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span> /
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".country").innerHTML = response.data.sys.country;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  if (
    response.data.weather[0].description == "clear sky" ||
    response.data.weather[0].description == "few clouds"
  ) {
    document.body.style.background =
      "radial-gradient(circle at 10% 20%, rgb(149, 219, 254) 0%, rgb(7, 134, 197) 90.1%)";
  }
  if (
    response.data.weather[0].description == "scattered clouds" ||
    response.data.weather[0].description == "broken clouds" ||
    response.data.weather[0].description == "mist"
  ) {
    document.body.style.background =
      "linear-gradient(to right, #d7d2cc 0%, #304352 100%)";
  }
  if (
    response.data.weather[0].description == "shower rain" ||
    response.data.weather[0].description == "rain" ||
    response.data.weather[0].description == "thunderstorm"
  ) {
    document.body.style.background =
      "linear-gradient(to top, #09203f 0%, #537895 100%)";
  }

  if (response.data.weather[0].description == "snow") {
    document.body.style.background =
      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  }

  let weatherIcon = document.querySelector("#weather-img");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
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
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionButton = document.querySelector("button");
currentPositionButton.addEventListener("click", getPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityWeather);

search("New York");
