// var requirejs = require('requirejs');
$(document).ready(
  $("#search").on("keyup", (event) => {
    if (event.keyCode === 13) {
      getWeather();
    }
  })
);

async function getWeather() {
  let api_key = config.openWapiKey;
  const zipCode = getZip();
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zipCode}&appid=${api_key}`
    );
    const weather = await response.json();
    console.log(weather);
    display(weather);
  } catch (err) {
    alert("Please enter a valid Zip Code"); // TypeError: failed to fetch
  };
};

function display(weather) {
  const city = weather.name;
  const temp = weather.main.temp;
  const icon = weather.weather[0].icon;
  const lat = weather.coord.lat;
  const lon = weather.coord.lon;

  $("#card").find("#city").text(city);
  $("#temp").text(`${temp}° F`);
  $("#weatherImg").attr(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  getTimeZone(lat, lon);
  setInterval(() => {
    getTimeZone(lat, lon);
  }, 1000);
};

async function getTimeZone(lat, lon) {
  let apiKey = config.latapiKey;
  const response = await fetch(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`
  );
  const timeZone = await response.json();
  console.log(timeZone);
  getTime(timeZone)
};

function getTime(timeZone) {
  // const moment = require('moment');
  // const time = moment().format('h:mm:ss a');
  let time = timeZone.formatted.slice(11, 19);
  $("#time").text(`current local time: ${time}`);
};

function getZip() {
  const zip = $("#search").val();
  $("#search").val("");
  return zip;
};

// getWeather();
//change the background to a specific img for the weather type
// $('#weatherType').text(weather.weather[0].description);
// if(weather.weather[0].description = 'clouds'){
//     $('body').addClass('cloudy')
// }
