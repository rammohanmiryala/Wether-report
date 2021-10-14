// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


var citynameEl = document.querySelector('.city-name')
var searchBtn = document.querySelector('#search-button');
var searchEl = document.querySelector('#search-inpurt');
var todaytempEl = document.querySelector('#today-temp')
var todaywindEl = document.querySelector('#today-wind')
var errormessgeEL = document.querySelector('.error-messge');







function getApi() {
    if (searchEl.value == " "){
        errormessgeEL.innerHTML = 'input is empty'
       } 

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchEl.value + '&appid=65d399c284fc843c554beb939eac0cb5';
    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            var namevalue = data['city']['name']
            var tempvalue = data['list'][0]['main']['temp']
            var windvalue = data['list'][0]['wind']['speed']
            citynameEl.innerHTML = namevalue
            todaytempEl.innerHTML = 'Temperature :' + tempvalue
            todaywindEl.innerHTML = 'Wind speed  :' + windvalue

        })
        .catch(err => {
            errormessgeEL.innerHTML = 'input is' + err
        })


}
searchBtn.addEventListener('click', getApi)






// function checkinput {
//     var searchvalue = searchEl.value
//     if (searchvalue == "") {
//         errormessgeEL.innerHTML = 'input is empty'
//     }
//     if (!searchvalue) {
//         errormessgeEL.innerHTML = '"No ciy is found"'
//     }
//     if (searchvalue==true) {
//         return searchvalue

//     }
//     getApi()
// }


// function newFunction(data) {
//     citynameEl.textContent = data['name'];
//     console.log(data['name'])
// }

//searchBtn.addEventListener('click',getApi)        





// function selectcityname() {
//     var cityentered ="";
//     var cityname =searchEl.value;
//     console.log(cityname);

//     // var requesturl = api.openweathermap.org/data/2.5/weather?q=cityname&appid=65d399c284fc843c554beb939eac0cb5;
//     // $( function() {
//     //     var availableTags = requesturl;
//     //     $( "#tags" ).autocomplete({
//     //       source: availableTags
//     //     });
//     // } );
// }

// function getapi(){
//     var cityname =searchEl.value
//     var requesturl = api.openweathermap.org/data/2.5/weather?q=cityname&appid=65d399c284fc843c554beb939eac0cb5;
//     console(requesturl)