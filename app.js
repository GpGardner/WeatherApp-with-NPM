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
    display(weather);
}

function display(weather){
    $('#card').find('#city').text(weather.name);
    $('#temp').text(weather.main.temp)
    getTime();
}

function getTime(){
    // const moment = require('moment');
    const time = moment().format('h:mm:ss a');
    $('#time').text(time);
    return time
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