// GIVEN a weather dashboard with form inputs
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
var bottomcardEl = document.querySelector('#bottomcard')
var searchresultsEl = document.querySelector('.searchresults')

// present date
const todaytime = moment().format("YYYY-MM-DD")

// funtion to search citya and append the search//
var searchcity = function (event) {
    event.preventDefault();
    var cityname = searchEl.value.trim();
    // add the serach to the bottom of the div
    if (cityname) {
        var addsearchreseultEl = document.createElement("button")
        addsearchreseultEl.setAttribute("class", "searchcitybutton")
        searchresultsEl.appendChild(addsearchreseultEl)
        addsearchreseultEl.textContent = cityname
        todayweather(cityname)
        searchEl.value = '';
    } else {
        displaytime()
    }
};
//  funtion that makes to dispay error messge for empty input
function displaytime() {
    var time = 3;
    var timerInterval = setInterval(function () {
        time--;
        errormessgeEL.textContent = "'" + "Please enter a cityname" + "!" + "'"
        if (time === 0) {
            clearInterval(timerInterval);
            errormessgeEL.textContent = " "
        }
    }, 1000);
}
var lonvalue;
var latvalue;

//funtion to get the current weather conditions for that city
function todayweather(cityname) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&appid=65d399c284fc843c554beb939eac0cb5';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        //parmenters current wether api
        .then(function (data) {
            lonvalue = data['city'].coord.lon;
            latvalue = data['city'].coord.lat;
            var datevalue = data['list'][0].dt_txt
            var namevalue = data['city'].name
            var tempvalue = data['list'][0].main.temp
            var windvalue = data['list'][0].wind.speed
            var todayhumidityvalue = data['list'][0].main.humidity
            citynameEl.innerHTML = namevalue + ' ' + ' ' + ' ( ' + datevalue.slice(0, 10) + ' ) '
            var roundtemp = (tempvalue - 273.15)
            todaytempEl.innerHTML = (Math.round(roundtemp)) + " " + "℃"
            todaywindEl.innerHTML = windvalue + " " + "MPH"
            todayhumidityEl.innerHTML = todayhumidityvalue + " " + "%"
            uvvalue(lonvalue, latvalue)

        })
        .catch(err => {
            notvalidate()

        })
}


//  funtion that makes to dispay error messge for the invalid entry  
function notvalidate() {

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

//  funtion that checks uvindex from onecall 
function uvvalue() {
    var uvindexdata = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latvalue + '&lon=' + lonvalue + '&exclude=minutely,hourly&appid=65d399c284fc843c554beb939eac0cb5'
    console.log(uvindexdata)
    fetch(uvindexdata)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var indexvalue = data['current']['uvi']
            uvindexEl.innerHTML = indexvalue
            wetherfor5days(latvalue, lonvalue)

        })
}
//  funtion that checks wether with lat and log 
function wetherfor5days(latvalue, lonvalue) {

    var next5days = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latvalue + '&lon=' + lonvalue + '&exclude=minutely,hourly&appid=65d399c284fc843c554beb939eac0cb5'
    console.log(next5days)

    fetch(next5days)
        .then(function (response) {
            return response.json();
        })

        //parmenters current wether api that appendsChild
        .then(function (data) {
            for (var i = 1; i < 6; i++) {
                // create weatherday bottomdiv//
                var weatherdayEl = document.createElement("div")
                var dayEl = document.createElement("p");
                var imgEl = document.createElement("img");
                var tempEl = document.createElement("p");
                var windEl = document.createElement("p");
                var humidityEl = document.createElement("p");

                // bottomcardEl is div of the weatherdayEl//
                bottomcardEl.appendChild(weatherdayEl);
                weatherdayEl.appendChild(dayEl)
                weatherdayEl.appendChild(imgEl)
                weatherdayEl.appendChild(tempEl)
                weatherdayEl.appendChild(windEl)
                weatherdayEl.appendChild(humidityEl)

                var imagefor5days = data['daily'][i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + imagefor5days + ".png";

                console.log(iconurl)
                var tempfor5days = data['daily'][i].temp.day;
                var windfor5days = data['daily'][i].wind_speed;
                var humidityfor5days = data['daily'][i].humidity;
                dayEl.textContent = moment(todaytime).add([i], 'd').format("YYYY-MM-DD");
                var roundtemp5days = (tempfor5days - 273.15)
                imgEl.textContent = iconurl
                tempEl.textContent = 'Temp:' + " " + (Math.round(roundtemp5days)) + " " + "℃"
                windEl.textContent = 'wind:' + " " + windfor5days + " " + "MPH"
                humidityEl.textContent = 'humidity:' + " " + humidityfor5days + " " + "%"

                weatherdayEl.setAttribute("class", "weatherday")
                dayEl.setAttribute("class", "dates")
                imgEl.setAttribute("class", "climateimg")
                imgEl.setAttribute("src", iconurl)
                tempEl.setAttribute("class", "temps")
                windEl.setAttribute("class", "winds")
                humidityEl.setAttribute("class", "humidits")



            }

        });
    bottomcardEl.innerHTML = ""


}
searchBtn.addEventListener('click', searchcity)