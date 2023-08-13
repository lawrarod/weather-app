const apiKey = "46f80a02ecae410460d59960ded6e1c6"; 
// https://home.openweathermap.org/api_keys
// xolaven495@v1zw.com & 4)j-XxA7n*2+
// 8f4103a6ccb9c9408d9285a4273a6dfd

const cityInput = document.getElementById('city-input');
const form = document.querySelector('form');
const weather_data = document.getElementById('weather-data');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city_value = cityInput.value;
  getWeatherData(city_value);
});

const getWeatherData = async (city_value) => {
  try {
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city_value}&appid=${apiKey}&units=metric`);

    if(!response.ok){
      throw new Error("Network response failed.");
    }

    
    const data = await response.json();

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weather_data.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weather_data.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weather_data.querySelector(".description").textContent = description;

    weather_data.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weather_data.querySelector(".icon").innerHTML = "";
    weather_data.querySelector(".temperature").textContent = "";
    weather_data.querySelector(".description").textContent =
      "An error happened, please try again later";

    weather_data.querySelector(".details").innerHTML = "";
  }
}

  