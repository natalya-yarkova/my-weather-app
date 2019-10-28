function convert() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 73;
}
let temperatureLink = document.querySelector("#fahrenheit");
temperatureLink.addEventListener("click", convert);

function formatDate1() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  console.log(day);

  let hours = now.getHours();
  console.log(hours);

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  console.log(minutes);

  let sentence = `${day}, , ${hours};${minutes}`;
  console.log(sentence);

  let date = document.querySelector("#currentDate");
  date.innerHTML = `${day}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  if (searchCity.value.length) {
    let city = document.querySelector("#cityName");
    city.innerHTML = searchCity.value;
    let apiKey = "2a6b1517a30b4b214a8f8e4f52b014eb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&APPID=${apiKey}&units=metrics`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayTemperature);
  }
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}C`;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);

formatDate1();

//button

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2a6b1517a30b4b214a8f8e4f52b014eb";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let theTemperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let currentCity = document.querySelector("#cityName");
  currentCity.innerHTML = cityName;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${theTemperature}`;
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentWeather);
