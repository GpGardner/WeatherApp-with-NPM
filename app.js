// var requirejs = require('requirejs');
$(document).ready($('#search').on('keyup', (event) => {
  if(event.keyCode === 13){
    getWeather();
  }
}));




async function getWeather(){
     const zipCode = getZip();
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zipCode}&appid=818039c2c15cea97465604f0ede2a026`);
    const weather = await response.json();
    console.log(weather);
    display(weather);
}

function display(weather){
    const city = weather.name;
    const temp = weather.main.temp;
    const icon = weather.weather[0].icon;
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    

    $('#card').find('#city').text(city);
    $('#temp').text(`${temp}° F`);
    $('#weatherImg').attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
    getTimeZone(lat, lon)
    
}

async function getTimeZone(lat, lon){
  const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=0FBW9WPXRUYU&format=json&by=position&lat=${lat}&lng=${lon}`)
  const timeZone = await response.json();
  console.log(timeZone)
  getTime(timeZone);
}

function getTime(timeZone){
    // const moment = require('moment');
    // const time = moment().format('h:mm:ss a');
    let time = timeZone.formatted.slice(11,19);
    
    $('#time').text(`current local time: ${time}`);
}

function getZip() {
    const zip = $('#search').val();
    $('#search').val('');
    return zip;
}

// getWeather();
//change the background to a specific img for the weather type
// $('#weatherType').text(weather.weather[0].description);
// if(weather.weather[0].description = 'clouds'){
//     $('body').addClass('cloudy')
// }