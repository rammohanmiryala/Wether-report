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
var todayhumidityEl = document.querySelector('#today-humidity')
var uvindexEl = document.querySelector('#uv-index')

var lonvalue;
var latvalue;


var searchcity = function (event) {
    event.preventDefault();

    var cityname = searchEl.value.trim();

    if (cityname) {
        todayweather(cityname);
        searchEl.value = '';

    } else {
        displaytime()
    }
};


//funtion to get the current weather conditions for that city
function todayweather() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchEl.value + '&appid=65d399c284fc843c554beb939eac0cb5';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        //parmenters current wether api
        .then(function (data) {
            lonvalue = data['city']['coord']['lon'];
            latvalue = data['city']['coord']['lat'];
            uvvalue()
            var datevalue = data['list'][0]['dt_txt']
            var namevalue = data['city']['name']
            var tempvalue = data['list'][0]['main']['temp']
            var windvalue = data['list'][0]['wind']['speed']
            var todayhumidityvalue = data['list'][0]['main']['humidity']
            citynameEl.innerHTML = namevalue + ' ' + ' ' + ' ( ' + datevalue.slice(0, 10) + ' ) '
            var roundtemp = (((tempvalue - 273.15) * 9 / 5) + 32)
            todaytempEl.innerHTML = (Math.round(roundtemp)) + " " + "F"
            todayhumidityEl.innerHTML = todayhumidityvalue + " " + "%"
            todaywindEl.innerHTML = windvalue + " " + "MPH"
            todaywindEl.innerHTML = windvalue + " " + "MPH"
        })
        .catch(err => {
            errormessgeEL.innerHTML = 'city name is not valid'
        })

}


function uvvalue() {
    console.log(latvalue)
    console.log(lonvalue)
    var uvindexdata = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latvalue + '&lon=' + lonvalue + '&exclude=minutely,hourly&appid=65d399c284fc843c554beb939eac0cb5'
    console.log(uvindexdata)
    fetch(uvindexdata)
        .then(function (response) {
            return response.json();
        })
        //parmenters current wether api
        .then(function (data) {
            var indexvalue = data['current']['uvi']
            uvindexEl.innerHTML = indexvalue
        })

}


function displaytime() {
    var time = 4;
    var timerInterval = setInterval(function () {
        time--;
        errormessgeEL.textContent = "Please enter a cityname"
        if (time === 0) {
            clearInterval(timerInterval);
            errormessgeEL.textContent = " "
        }
    }, 1000);

}



searchBtn.addEventListener('click', searchcity)

searchBtn.addEventListener('click', uvvalue)






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