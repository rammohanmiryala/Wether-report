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
var datesEl = document.querySelector('.dates')
var date1el = document.querySelector('#date')
var lonvalue;
var latvalue;
var datevalue;


var searchcity = function (event) {
    event.preventDefault();

    var cityname = searchEl.value.trim();

    if (cityname) {
        todayweather(cityname);
        wetherfor5days(cityname);
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
            
            datevalue = data['list'][0]['dt_txt']
            var namevalue = data['city']['name']
            var tempvalue = data['list'][0]['main']['temp']
            var windvalue = data['list'][0]['wind']['speed']
            var todayhumidityvalue = data['list'][0]['main']['humidity']
            citynameEl.innerHTML = namevalue + ' ' + ' ' + ' ( ' + datevalue.slice(0, 10) + ' ) '
            var roundtemp = (((tempvalue - 273.15) * 9 / 5) + 32)
            todaytempEl.innerHTML = (Math.round(roundtemp)) + " " + "F"          
            todaywindEl.innerHTML = windvalue + " " + "MPH"
            todayhumidityEl.innerHTML = todayhumidityvalue + " " + "%"
            uvvalue()
            wetherfor5days()
        })
        .catch(err => {
            notwalid()

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
    var time = 3;
    var timerInterval = setInterval(function () {
        time--;
        errormessgeEL.textContent = "Please enter a cityname"
        if (time === 0) {
            clearInterval(timerInterval);
            errormessgeEL.textContent = " "
        }
    }, 1000);

}
function notwalid() {
    var time = 3;
    var timerInterval = setInterval(function () {
        time--;
        errormessgeEL.textContent = "city name is not valid"
        if (time === 0) {
            clearInterval(timerInterval);
            errormessgeEL.textContent = " "
        }
    }, 1000);

}

function wetherfor5days() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchEl.value + '&appid=65d399c284fc843c554beb939eac0cb5';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        //parmenters current wether api
        .then(function (data) {
            //var roundtemp = (((tempvalue1 - 273.15) * 9 / 5) + 32)
            var datevalue1 = data['list'][6]['dt_txt']
            document.querySelector('#date1').innerHTML = ' ( ' + datevalue1.slice(0, 10) + ' ) '
            var datevalue2 = data['list'][14]['dt_txt']
            document.querySelector('#date2').innerHTML = ' ( ' + datevalue2.slice(0, 10) + ' ) '
            var datevalue3 = data['list'][22]['dt_txt']
            document.querySelector('#date3').innerHTML = ' ( ' + datevalue3.slice(0, 10) + ' ) '
            var datevalue4 = data['list'][30]['dt_txt']
            document.querySelector('#date4').innerHTML = ' ( ' + datevalue4.slice(0, 10) + ' ) '
            var datevalue5 = data['list'][38]['dt_txt']
            document.querySelector('#date5').innerHTML = ' ( ' + datevalue5.slice(0, 10) + ' ) '
            var tempvalue1 = data['list'][6]['main']['temp']
            document.querySelector('#temp1').innerHTML = (Math.round((tempvalue1 - 273.15) * 9 / 5) + 32) + " " + "F"
            var tempvalue2 = data['list'][14]['main']['temp']
            document.querySelector('#temp2').innerHTML = (Math.round((tempvalue2 - 273.15) * 9 / 5) + 32) + " " + "F"
            var tempvalue3 = data['list'][22]['main']['temp']
            document.querySelector('#temp3').innerHTML = (Math.round((tempvalue3 - 273.15) * 9 / 5) + 32) + " " + "F"
            var tempvalue4 = data['list'][30]['main']['temp']
            document.querySelector('#temp4').innerHTML = (Math.round((tempvalue4 - 273.15) * 9 / 5) + 32) + " " + "F"
            var tempvalue5 = data['list'][38]['main']['temp']
            document.querySelector('#temp5').innerHTML = (Math.round((tempvalue5 - 273.15) * 9 / 5) + 32) + " " + "F"
            var wind1 = data['list'][6]['wind']['speed']
            document.querySelector('#wind1').innerHTML = wind1 + " " + "MPH"
            var wind2 = data['list'][14]['wind']['speed']
            document.querySelector('#wind2').innerHTML = wind2 + " " + "MPH"
            var wind3 = data['list'][22]['wind']['speed']
            document.querySelector('#wind3').innerHTML = wind3 + " " + "MPH"
            var wind4 = data['list'][30]['wind']['speed']
            document.querySelector('#wind4').innerHTML = wind4 + " " + "MPH"
            var wind5 = data['list'][38]['wind']['speed']
            document.querySelector('#wind5').innerHTML = wind5 + " " + "MPH"
            var humidity1 = data['list'][6]['main']['humidity']
            document.querySelector('#humidity1').innerHTML = humidity1 + " " + "%"
            var humidity2 = data['list'][14]['main']['humidity']
            document.querySelector('#humidity2').innerHTML = humidity2 + " " + "%"
            var humidity3 = data['list'][22]['main']['humidity']
            document.querySelector('#humidity3').innerHTML = humidity3 + " " + "%"
            var humidity4 = data['list'][30]['main']['humidity']
            document.querySelector('#humidity4').innerHTML = humidity4 + " " + "%"
            var humidity5 = data['list'][38]['main']['humidity']
            document.querySelector('#humidity5').innerHTML = humidity5 + " " + "%"
        })


}



searchBtn.addEventListener('click', searchcity)








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